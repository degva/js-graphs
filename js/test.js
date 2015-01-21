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

		/* Draw Grid */
		/* Should retrive the maximum
		 * of all lines to make
		 * a better fitting grif
		 */
		this.gridRender(maxH, maxLength);
		/*
		 * For each value on the stack
		 * 		Take data
		 * 		draw lines
		 * 		draw text
		 */
		for (var i = 0; i < this.stack.length; i++) {
			this.renderLine(this.stack[i], maxH, maxLength);
		}
	}

	this.renderLine = function(line, maxH, maxLen) {
		var context = this.localCanvasData.context;
	
		var cH = this.localCanvasData.canvasHeight - 100;
		var cW = this.localCanvasData.canvasWidth - 150;
	
		var uniHeight = cH / maxH;
		var uniWidth = cW / maxLen;

		for (var i = 0; i < line.nodes.length - 2; i++ ) {
			context.beginPath();

			x1 = 50 + (uniWidth)*(i);
			y1 = 50 + cH - (uniHeight)*(line.nodes[i+1][1]);

			x2 = 50 + (uniWidth)*(i+1)
			y2 = 50 + cH - (uniHeight)*(line.nodes[i+2][1]);

			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.strokeStyle = line.color;
			context.stroke();
		}

	};

	this.gridRender = function (nY, nX) {
		console.log('LOG: Rendering the grid');
		var context = this.localCanvasData.context;
		var cH = this.localCanvasData.canvasHeight - 100;
		var cW = this.localCanvasData.canvasWidth - 150;
	
		var uniHeight = cH / nY;
		var uniWidth = cW / nX;

		context.beginPath();

		/* Vertical Lines */
		for ( var i = 0; i < nX+1; i++) {
			context.moveTo(50 + uniWidth * i, 50);
			context.lineTo(50 + uniWidth * i, cH+50);
		}

		/* Horizontal Lines */
		for ( var i = 0; i < nY+1; i++) {
			context.moveTo(50, 50 + uniHeight * i);
			context.lineTo(cW+50, 50 + uniHeight * i);
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


/* Start App
 */
$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var app = new App(canvas);
	app.start();

	var data = ['Line One',[1,2],[2,6],[3,0],[4,3],[5,1],[6,12],[7,3],[8,20],[9,10]];
	var line = new Line(data, '#FF0000');
	app.addToStack(line);

	app.sRender.render();
});
