"use strict";

var Memory = {

	pairCompare: [],
	clickCounter: 0,
	amountOfGuesses: 0,
	matchedPairs: 0,
	maxPairs: 0,

	init : function() {

		var rows = 4;
		var cols = 4;
		var randomArray = RandomGenerator.getPictureArray(rows, cols);

		Memory.maxPairs = (rows * cols) / 2;

		Memory.createTable(rows, cols, randomArray);
		Memory.divideValues(randomArray);
	},

	createTable : function(rows, cols) {

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

	divideValues : function(randomArray, rows, cols) {

		var aValues = document.getElementsByTagName("a");

		for (var i = 0; i < randomArray.length; i += 1) {
			
			aValues[i].setAttribute("rel", randomArray[i]);
			aValues[i].addEventListener("click", Memory.whenClick, false);
		}
	},

	whenClick : function(e) {
		
		e.preventDefault();
		
		if (Memory.clickCounter < 2) {

			var tileValue = this;
			var rel = tileValue.rel;

				
			if(!tileValue.hasAttribute("type", "#")) {
				
				Memory.clickCounter += 1;
				tileValue.firstChild.setAttribute("src", "pics/" + rel + ".png");
				tileValue.setAttribute("type", "#");
	
				Memory.pairCompare.push(tileValue);
			}
		}

		if (Memory.pairCompare.length === 2 && Memory.clickCounter === 2) {

			Memory.checkPair();
		}

		if (Memory.matchedPairs === Memory.maxPairs) {

			document.getElementById("result").innerHTML = "Grattis, du vann! Det tog " + Memory.amountOfGuesses + " gissningar";	
		}
	},

	checkPair : function() {
		
		if (Memory.pairCompare[0].rel === Memory.pairCompare[1].rel) {					
				
			Memory.matchedPairs += 1;
			Memory.amountOfGuesses += 1;
			Memory.clickCounter = 0;
			Memory.pairCompare = [];
		}
		else
		{
			setTimeout(function () {

			for (var i = 0; i < Memory.pairCompare.length; i += 1) {		
						
			Memory.pairCompare[i].firstChild.src = "pics/0.png";
			Memory.pairCompare[i].removeAttribute("type");
			}

			Memory.amountOfGuesses += 1;
			Memory.clickCounter = 0;
			Memory.pairCompare = [];
			}, 1000);
		}
	},

};

window.onload = Memory.init;