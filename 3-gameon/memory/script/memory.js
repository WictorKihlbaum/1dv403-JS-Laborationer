"use strict";

var Memory = {

	init:function()	{

		var rows = 4;
		var cols = 4;
		var randomArray = RandomGenerator.getPictureArray(rows, cols);
		console.log(randomArray);

		Memory.createTable(rows, cols);
	},

	createTable : function(rows, cols) {

		var memoryDiv = document.getElementById("memoryDiv");

		var memoryTable = document.createElement("table");
		var tableBody = document.createElement("tbody");

		for (var r = 0; r < rows; r++) {

			var row = document.createElement("tr");

			for (var c = 0; c < cols; c++) {

				var cell = document.createElement("td");
				var cellImg = document.createElement("img");
				cellImg.setAttribute("src", "pics/0.png");
				
				cell.appendChild(cellImg);
				row.appendChild(cell);
			}

			tableBody.appendChild(row);
		}

		memoryTable.appendChild(tableBody);
		memoryDiv.appendChild(memoryTable);
	},

};

window.onload = Memory.init;