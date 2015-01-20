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
		/* Draw Grid */
		/* Should retrive the maximum
		 * of all lines to make
		 * a better fitting grif
		 */
		this.gridRender(10, 10);
		/*
		 * For each value on the stack
		 * 		Take data
		 * 		draw lines
		 * 		draw text
		 */
		for (var i = 0; i < this.stack.length; i++) {
			this.renderLine(this.stack[i]);
		}
	}

	this.renderLine = function(line) {
		var context = this.localCanvasData.context;
		var width = this.localCanvasData.canvasWidth;
		var height = this.localCanvasData.canvasHeight;

		for (var i = 1; i < line.nodes.length - 1; i++ ) {
			context.beginPath();
			console.log("Just like that: " + line.nodes[i]);

			x1 = (width / line.nodes.length-1)*(i+0.5);
			y1 = height - (height / line.maxVal)*(line.nodes[i][1]-0.5);

			x2 = (width / line.nodes.length-1)*(i+1.5);
			y2 = height - (height / line.maxVal)*(line.nodes[i+1][1]-0.5);

			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.strokeStyle = line.color;
			context.stroke();
		}

	};

	this.gridRender = function (nY, nX) {
		console.log('LOG: Rendering the grid');
		var context = this.localCanvasData.context;
		var cH = this.localCanvasData.canvasHeight;
		var cW = this.localCanvasData.canvasWidth;
	
		var uniHeight = cH / nY;
		var uniWidth = cW / nX;

		context.beginPath();

		for ( var i = 1; i < nX; i++) {
			context.moveTo(uniWidth * i, 0);
			context.lineTo(uniWidth * i, cH);
		}

		for ( var i = 1; i < nY; i++) {
			context.moveTo(0, uniHeight * i);
			context.lineTo(cW, uniHeight * i);
		}

		context.strokeStyle = '#aaa';
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

	var data = ['Line One',[1,2],[2,6],[3,9],[4,3],[5,1],[6,7]];
	var line = new Line(data, '#567');
	app.addToStack(line);

	app.sRender.render();
});
