"use strict";

var Quiz = {

	nextURL: "http://vhost3.lnu.se:20080/question/1",
	response: {},
	totalGuesses: [],
	guesses: 0,

	// Kallar på funktion för hämtning av inledande fråga.
	init: function() {
		Quiz.getQuestion();
		document.getElementById("sendButton").addEventListener("click", Quiz.sendAnswer, false);
		document.getElementById("restartButton").addEventListener("click", Quiz.restartQuiz, false);
	},

	// Anropar server och hämtar fråga.
	getQuestion: function() {

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4 && xhr.status === 200) {

				Quiz.response = JSON.parse(xhr.responseText);

				// Skickar in hämtad fråga i index, och ställer om adress för nästkommande fråga.
				document.getElementById("questionField").innerHTML = Quiz.response.question;
				Quiz.nextURL = Quiz.response.nextURL;
			}
			else {
				console.log("Läsfel! " + xhr.status);
			}
		}

		xhr.open("GET", Quiz.nextURL, true);
		xhr.send(null);
	},

	// Skickar användarens svar till server.
	sendAnswer: function() {

		Quiz.guesses += 1;

		// Hämtar användarens svar från textfält i index.
		var userAnswer = document.getElementById("answerField").value;
		var xhr = new XMLHttpRequest();

		Quiz.clearAnswerField();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4) {

				if (xhr.status === 200) {

					Quiz.response = JSON.parse(xhr.responseText);

					// Sparar antal gissningar per fråga till array.
					Quiz.totalGuesses.push(Quiz.guesses);
					Quiz.guesses = 0;

					// Kallar enbart på nästa fråga om det finns en "nextURL" i hämtat objekt.
					if ("nextURL" in Quiz.response) {
						
						Quiz.nextURL = Quiz.response.nextURL;
						Quiz.correctAnswer();

						setTimeout(function() {
							Quiz.getQuestion();
						}, 1000);
					}
					else {
						Quiz.finalResult();
						var hideSend = document.getElementById("sendButton");
							hideSend.style.display = "none";
					}
				}	
				else {
					Quiz.wrongAnswer();
				}
			}
			else {
				console.log("Läsfel! " + xhr.status);
			}
		}

		xhr.open("POST", Quiz.response.nextURL, true);
		xhr.setRequestHeader("content-Type", "application/json");

		var answer = {
			"answer": userAnswer
		};

		xhr.send(JSON.stringify(answer));
	},

	correctAnswer: function() {

		var correctAnswer = "Rätt svar!";	
		document.getElementById("questionField").innerHTML = correctAnswer;	
	},

	wrongAnswer: function() {

		var wrongAnswer = "Fel svar! Försök igen.";
		document.getElementById("questionField").innerHTML = wrongAnswer;
		
		setTimeout(function() {
			document.getElementById("questionField").innerHTML = Quiz.response.question;			
		}, 1000);
	},

	clearAnswerField: function() {

		document.getElementById("answerField").value = "";
	},

	// Vid avslutat spel presenteras resultatet.
	finalResult: function() {

		document.getElementById("questionField").innerHTML = "Spelet är slut!";

		var main = document.getElementsByTagName("main")[0];
		var resultField = document.createElement("div");
			resultField.id = "resultField";

		main.appendChild(resultField);

		// Skriver ut besvarade frågor och antal gissningar som krävdes för var och en av dessa.
		for (var i = 0; i < Quiz.totalGuesses.length; i += 1) {
			
			var p = document.createElement("p");
				p.innerHTML = "Fråga " + (i + 1) + " krävde " + Quiz.totalGuesses[i] + " försök.";
			
			resultField.appendChild(p);
		};
	},

	// Laddar om sida.
	restartQuiz: function() {
		location.reload();
	},

};

window.onload = Quiz.init;