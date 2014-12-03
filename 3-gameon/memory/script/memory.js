"use strict";

var Memory = {

	init:function()	{

		var rows = 4;
		var cols = 2;

		var randomArray = RandomGenerator.getPictureArray(rows, cols);

		console.log(randomArray);
		Memory.createTable(rows, cols);
	},

	createTable : function(rows, cols) {

		var main = document.getElementsByTagName("main")[0];

		var table = document.createElement("table");
		var tableBody = document.createElement("tbody");

		for (var i = 0; i < rows; i++) {

			var row = document.createElement("tr");

			for (var j = 0; j < cols; j++) {

				var cell = document.createElement("td");
				var cellText = document.createTextNode("cell in row "+i+", column "+j);

				cell.appendChild(cellText);
				row.appendChild(cell);
			}

			tableBody.appendChild(row);
		}

		table.appendChild(tableBody);
		main.appendChild(table);
		table.setAttribute("border", "2");

	},

};

window.onload = Memory.init;