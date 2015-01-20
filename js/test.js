function Line(data, color) {
	this.nodes = data;
	this.color = color;
	/*
	this.maxVal = ...;
	this.minVal = ...;
	*/
}

Line.prototype = {
	constructor = Line,
	addVal: function (chunk) {
		this.nodes.push(chunk);
	}
};

$(document).ready(function() {

});

/*
 * function Person(var1, var2, var3) {
 *	this.prop = var1;
 *	this.prop2 = var2
 *	...
 *	this.prop3 = ["asdf","asdf"];
 * }
 *
 * Person.prototype = {
 *	constructor: Person,
 *	func : function () {
 *		do things...;
 *	}
 * };
