"use strict";

var Quiz = {

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
			}
			else {

				console.log("Läsfel!" + xhr.status);
			}
		}; 

		xhr.open("GET", "http://vhost3.lnu.se:20080/question/1", true);
		xhr.send(null);
	},

	sendAnswer: function() {
		
		alert("hej");
		var userAnswer = document.getElementById("answerField").value;
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4 && xhr.status === 200) {

				var answer = JSON.parse(xhr.responseText);
			}
			else {
				console.log("Läsfel!" + xhr.status);
			}
		};

		xhr.open("POST", "http://vhost3.lnu.se:20080/answer/1", true);
		xhr.setRequestHeader("content-Type", "application/json");

		var answer = {

			"id": 125,
			"name": "Answer"
		};

		xhr.send(JSON.stringify(answer));
	},

};

window.onload = Quiz.init;