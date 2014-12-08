"use strict";

var Memory = {

	pairCompare: [],
	clickCount: 0,

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
			
			aValues[i].setAttribute("rel", randomArray[i]);
			aValues[i].addEventListener("click", Memory.whenClick, false);
		}
	},

	whenClick : function(e) {
		
		if (Memory.clickCount < 2) {

			var aTag = this;
			console.log(this);
			var rel = aTag.getAttribute("rel");

			aTag.firstChild.setAttribute("src", "pics/" + rel + ".png");
			Memory.pairCompare.push(aTag);
		}

		Memory.clickCount++;
		console.log(Memory.clickCount);
		console.log(Memory.pairCompare);

		if (Memory.pairCompare.length === 2 && Memory.clickCount === 2) {

			Memory.checkMatch();
		}
	},

	checkMatch : function() {

		if (Memory.pairCompare[0].getAttribute("rel") === Memory.pairCompare[1].getAttribute("rel")) {
						
			Memory.pairCompare = [];
			Memory.clickCount = 0;
		}
		else 
		{
			setTimeout(function () {

				for (var i = 0; i < Memory.pairCompare.length; i += 1) {		
					
					Memory.pairCompare[i].firstChild.src = "pics/0.png";
				}

				console.log(Memory.pairCompare);
				Memory.pairCompare = [];
				Memory.clickCount = 0;
				console.log(Memory.pairCompare);
			}, 1000);
		}
	},

};

window.onload = Memory.init;