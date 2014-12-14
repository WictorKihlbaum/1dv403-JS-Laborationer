"use strict";

var Quiz = {

	init : function() {

		document.getElementById("getButton").addEventListener("click", Quiz.getQuestion, false);
	},

	getQuestion : function() {

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4 && xhr.status === 200) {

				var question = JSON.parse(xhr.responseText);
				document.getElementById("qfield").innerHTML = question.question;
				console.log(question);
			}

		}

		xhr.open("GET", "http://vhost3.lnu.se:20080/question/1", true);
		xhr.send(null);
	},
	
};

window.onload = Quiz.init;