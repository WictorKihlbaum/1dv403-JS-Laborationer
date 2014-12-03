"use strict";

var Memory = {

	memoryArray: [],

	init:function()	{

		var rows = 4;
		var cols = 4;

		var random = RandomGenerator.getPictureArray(rows, cols);

		console.log(random);


	},

};

window.onload = Memory.init;