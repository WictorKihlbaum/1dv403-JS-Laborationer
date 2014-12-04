"use strict";

var Memory = {

	init:function()	{

		var rows = 4;
		var cols = 4;
		var randomArray = RandomGenerator.getPictureArray(rows, cols);

		Memory.createTable(rows, cols, randomArray);
		Memory.divideValues(randomArray);
	},

	createTable : function(rows, cols, randomArray) {

		var memoryDiv = document.getElementById("memoryDiv");
		var memoryTable = document.createElement("table");
		var tableBody = document.createElement("tbody");

		for (var r = 0; r < rows; r += 1) {

			var row = document.createElement("tr");

			for (var c = 0; c < cols; c += 1) {

				var cell = document.createElement("td");
				var cellImg = document.createElement("img");
					cellImg.setAttribute("src", "pics/0.png");
					cellImg.alt = "Show hidden image";
				var cellImgLink = document.createElement("a");
					cellImgLink.href = "#";
					
				cellImgLink.appendChild(cellImg);
				cell.appendChild(cellImgLink);
				row.appendChild(cell);
			}

			tableBody.appendChild(row);
		}

		memoryTable.appendChild(tableBody);
		memoryDiv.appendChild(memoryTable);
	},

	divideValues : function(randomArray) {

		var aValues = document.getElementsByTagName("a");

		for (var i = 0; i < randomArray.length; i += 1) {
			
			aValues[i].rel = randomArray[i];
		}

		for (var i = 0; i < aValues.length; i += 1) {
			aValues[i].addEventListener("click", Memory.whenClick, false);
		}
	},

	whenClick : function(e) {

		e.preventDefault();
		console.log(this);
		var aTag = this;
		var rel = aTag.getAttribute("rel");
		aTag.firstChild.setAttribute("src", "pics/" + rel + ".png");
	},

};

window.onload = Memory.init;