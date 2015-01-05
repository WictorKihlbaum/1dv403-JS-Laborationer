"use strict";

var Quiz = {

	nextURL: "http://vhost3.lnu.se:20080/question/1",
	response: {},
	totalGuesses: [],
	guesses: 0,

	init: function() {
		Quiz.getQuestion();
		document.getElementById("sendButton").addEventListener("click", Quiz.sendAnswer, false);
	},

	getQuestion: function() {

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4 && xhr.status === 200) {

				Quiz.response = JSON.parse(xhr.responseText);

				document.getElementById("questionField").innerHTML = Quiz.response.question;
				Quiz.nextURL = Quiz.response.nextURL;
				console.log(Quiz.response);
			}
			else {
				console.log("Läsfel! " + xhr.status);
			}
		}; 

		xhr.open("GET", Quiz.nextURL, true);
		xhr.send(null);
	},

	sendAnswer: function() {

		Quiz.guesses += 1;

		var userAnswer = document.getElementById("answerField").value;
		var xhr = new XMLHttpRequest();

		Quiz.clearAnswerField();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4) {

				if (xhr.status === 200) {

					Quiz.response = JSON.parse(xhr.responseText);

					Quiz.totalGuesses.push(Quiz.guesses);
					Quiz.guesses = 0;

					if ("nextURL" in Quiz.response) {
						
						Quiz.nextURL = Quiz.response.nextURL;
						Quiz.correctAnswer();

						setTimeout(function() {
							Quiz.getQuestion();
							console.log(xhr.responseText);
						}, 1000);
					}
					else {

						Quiz.finalResult();
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

	finalResult: function() {

		document.getElementById("questionField").innerHTML = "Spelet är slut!";

		for (var i = 0; i < Quiz.totalGuesses.length; i += 1) {
			
			var resultField = document.getElementById("resultField");
			var p = document.createElement("p");

			p.innerHTML = "Fråga " + (i + 1) + " krävde " + Quiz.totalGuesses[i] + " försök.";
			
			resultField.appendChild(p);
		};
	},

};

window.onload = Quiz.init;