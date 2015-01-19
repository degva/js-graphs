$(document).ready(function() {
	var canvas = document.getElementById('plotCanvas');
	var context = canvas.getContext('2d');

	context.translate(0.5,0.5);

	addGrid(context, canvas.height, canvas.width, 10, 10);

});

function addGrid(context, cH, cW, nX, nY) {

	var uniHeight = cH / nY;
	var uniWidth = cW / nX;

	context.beginPath();

	for ( var i = 1; i < nX; i++) {
		context.moveTo(uniWidth * i, 0);
		context.lineTo(uniWidth * i, cH);
	}

	for ( var i = 1; i < nY; i++) {
		context.moveTo(0,						 uniHeight * i);
		context.lineTo(cW, uniHeight * i);
	}

	context.strokeStyle = '#aaa';
	context.stroke();
	
}


