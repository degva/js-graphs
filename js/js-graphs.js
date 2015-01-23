
/* Util functions
 * to use trough all the app
 */
function retrieveMaxVal( arr ) {
	var arrLength = arr.length;
	var maximum = arr[1][1];
	for (var i = 1; i < arrLength; i++) {
		if (maximum < arr[i][1]) {
			maximum = arr[i][1];
		}
	}
	return maximum;
}

function retrieveMinVal( arr ) {
	var arrLength = arr.length;
	var minimum = arr[1][1];
	for (var i = 1; i < arrLength; i++) {
		if (minimum > arr[i][1]) {
			minimum = arr[i][1];
		}
	}
	return minimum;
}

/* StackRender
 * This object is the one that will write over the canvas
 */
function StackRender(ctxt, cHeight, cWidth) {
	/* The stack only has lines, nothing else */
	this.alreadyWritten = false;
	this.stack = [];
	this.localCanvasData = {
		context: ctxt,
		canvasHeight: cHeight,
		canvasWidth: cWidth
	};
	this.render = function() {
		/* retrieve important data
		 * for the grid.
		 * How much data is in the array?
		 */
		var maxLength = 0;
		var maxH = 0;
		for (var i = 0; i < this.stack.length; i++) {
			if (this.stack[i].nodes.length > maxLength) {
				maxLength = this.stack[i].nodes.length - 1;
			}
			for (var e = 1; e < this.stack[i].nodes.length; e++ ) {
				if (this.stack[i].nodes[e][1] > maxH) {
					maxH = this.stack[i].nodes[e][1];
				}
			}
		}

		var context = this.localCanvasData.context;
		var cH = this.localCanvasData.canvasHeight - 100;
		var cW = this.localCanvasData.canvasWidth - 150;

		/* Draw Grid */
		/* Should retrive the maximum
		 * of all lines to make
		 * a better fitting grif
		 */
		this.gridRender(context, cH, cW, maxH, maxLength);

		/* Retrieve X values to check that every Line nodes have X values */
		var xValues = [];
		/* Find for a way if the data is broken */
		for (var i = 0; i < this.stack.length; i++ ) {
			for (var e = 0; e < this.stack[i].nodes.length - 1; e++) {
				if ( ! this.stack[i].nodes[e][0] in xValues) {
					xValues.push(this.stack[i].nodes[e][0]);
				}
				/* */
			}
		}
		xValues.sort();

		/*
		 * For each value on the stack
		 * 		Take data
		 * 		draw lines
		 * 		draw text
		 */
		for (var i = 0; i < this.stack.length; i++) {
			this.renderLine(context, cH, cW, this.stack[i], maxH, maxLength);
		}
	};

	this.renderLine = function(context, cH, cW, line, maxH, maxLen) {
	
		var uniHeight = cH / maxH;
		var uniWidth = cW / maxLen;

		for (var i = 0; i < line.nodes.length - 1; i++ ) {
			context.beginPath();

			x1 = 80 + (uniWidth)*(i);
			y1 = 50 + cH - (uniHeight)*(line.nodes[i][1]);

			x2 = 80 + (uniWidth)*(i+1)
			y2 = 50 + cH - (uniHeight)*(line.nodes[i+1][1]);

			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.strokeStyle = line.color;
			context.stroke();
			if (! this.alreadyWritten) {
				context.fillText(line.nodes[i][0], x1 - 5, this.localCanvasData.canvasHeight - 25);
			}
		}
		this.alreadyWritten = true;

	};

	this.gridRender = function (context, cH, cW, nY, nX) {
		console.log('LOG: Rendering the grid');
	
		var uniHeight = cH / nY;
		// var uniWidth = cW / nX;

		context.beginPath();

		var uniter = Math.round(50 / uniHeight);
		// var uniter = uniHeight / 100;

		
		/* Vertical Lines */
		/*
		for ( var i = 0; i < nX+1; i++) {
			if ( i % uniter == 0 ) {
				context.moveTo(50 + uniWidth * i, 50);
				context.lineTo(50 + uniWidth * i, cH+50);
			}
		}
		*/

		/* Horizontal Lines */
		for ( var i = 0; i < nY+1; i++) {
			if ( i % uniter == 0 ) {
				context.moveTo(50, this.localCanvasData.canvasHeight - ( 50 + uniHeight * i ));
				context.lineTo(cW+50, this.localCanvasData.canvasHeight - ( 50 + uniHeight * i ));
				context.fillText(i, 20, this.localCanvasData.canvasHeight - (47 + uniHeight * i));
			}
		}

		context.strokeStyle = '#ddd';
		context.stroke();
		console.log('LOG: Done');
	};
}

/* App Object
 * this has all the needed information
 * for the app
 */

function App(canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext('2d');


	this.sRender = new StackRender(this.context, canvas.height, canvas.width);

	this.addToStack = function (obj) {
		this.sRender.stack.push(obj);
	};

	/* Start App */
	this.start = function () {
		console.log('LOG: Starting App');
		this.context.translate(0.5, 0.5);
	};
}


/* Line Object
 * Object with all a line information
 */
function Line(data, color) {
	this.nodes = data;
	this.color = color;
	this.maxVal = retrieveMaxVal(this.nodes);
	this.minVal = retrieveMinVal(this.nodes);
}

Line.prototype = {
	constructor: Line,
	addVal: function (chunk) {
		this.nodes.push(chunk);
	}
};

