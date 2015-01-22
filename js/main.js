/* Start App
 */
$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var app = new App(canvas);
	app.start();

	var data = ['Line One',[1,2],[2,6],[3,0],[4,3],[5,1],[6,12],[7,3],[8,20],[9,10]];
	var data2 = ['Line Two',[1,7],[2,3],[3,0],[4,3],[5,10],[6,1],[7,3],[8,22],[9,14]];
	var data3 = ['Line Three',[1,15],[2,13],[3,12],[4,3],[5,10],[6,10],[7,22],[8,21],[9,50]];

	/* We need to sort the arrays */
	data.sort();
	data2.sort();
	data3.sort();

	var line = new Line(data, '#0000FF');
	var line2 = new Line(data2, '#FF0000');
	var line3 = new Line(data3, '#00FF00');

	app.addToStack(line2);
	app.addToStack(line3);
	app.addToStack(line);

	app.sRender.render();
});
