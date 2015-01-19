function init() {
	updateCanvas();
}

function updateCanvas() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	var data = [1.4,1.5,1.4,2,1,4,2,3,1,2,3,6,4,7,6,8,6,9];

	/*
	var circleSize = 10;
	var gaps = circleSize + 10;
	*/

	var i = 0;
	for (d in data) {
		console.log('Working with: ' + d);
		if (i != data.length) {
			context.beginPath();

			x1 = (width / data.length)*(i+0.5);
			y1 = height - (height / Math.max.apply(Math, data))*(data[i]-0.5);

			x2 = (width / data.length)*(i+1.5);
			y2 = height - (height / Math.max.apply(Math, data))*(data[i+1]-0.5);

			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.lineJoin = 'round';
			context.lineWidth = 5;
			context.strokeStyle = '#43A9D1';
			context.stroke();
			i++;
		}
	}
	/*
	for (d in data) {
		context.fillStyle = aColors[parseInt(Math.random()*aColorsLength)];
		context.beginPath();
		context.arc((width / data.length)*(i+0.5), height- (height / Math.max.apply( Math, data) )*(data[i] - 0.5) ,circleSize, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		i++;
	}
	*/
}
