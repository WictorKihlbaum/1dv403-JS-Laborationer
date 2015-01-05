"use strict";

var Quiz = {

	nextURL: "http://vhost3.lnu.se:20080/question/1",

	init: function() {
		Quiz.getQuestion();
		document.getElementById("sendButton").addEventListener("click", Quiz.sendAnswer, false);
	},

	getQuestion: function() {

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4 && xhr.status === 200) {

				var question = JSON.parse(xhr.responseText);
				document.getElementById("questionField").innerHTML = question.question;
				console.log(question);
				Quiz.nextURL = question.nextURL;
			}
			else {
				console.log("Läsfel! " + xhr.status);
			}
		}; 

		xhr.open("GET", Quiz.nextURL, true);
		xhr.send(null);
	},

	sendAnswer: function() {
		console.log("hej");
		var userAnswer = document.getElementById("answerField").value;
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4) {

				if (xhr.status === 200) {
					var answer = JSON.parse(xhr.responseText);
					console.log(xhr.responseText);
					Quiz.nextURL = answer.nextURL;
					Quiz.getQuestion();
				}	
				else {
					var wrongAnswer = "Fel svar! Försök igen.";
					document.getElementById("questionField").innerHTML = wrongAnswer;
				}
			}
			else {
				console.log("Läsfel! " + xhr.status);
			}
		};

		xhr.open("POST", Quiz.nextURL, true);
		xhr.setRequestHeader("content-Type", "application/json");

		var answer = {
			"answer": userAnswer
		};

		xhr.send(JSON.stringify(answer));
	},

};

window.onload = Quiz.init;