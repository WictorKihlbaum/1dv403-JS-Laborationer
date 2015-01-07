"use strict";

define(function() {

	var Imageapp = {

		init: function() {
			document.getElementById("imgApp").addEventListener("click", Imageapp.createElements, false);
		},

		createElements: function() {

			console.log("hej");

		 /* var imgAppDiv = document.createElement("div");
				imgAppDiv.id = "imgApp";
			var imgAppImg = document.createElement("img");
			var imgAppStart = document.createElement("a");
				imgAppStart.href = "";
			var taskbar = document.getElementById("taskbar"); 
				taskbar.appendChild(imgAppDiv);

			imgAppDiv.appendChild(imgAppStart);
			imgAppStart.appendChild(imgAppImg);
				imgAppImg.setAttribute("src", "images/appIcon.png");
				imgAppImg.alt = "Image App Link"; */
				
		},

	}

	return Imageapp;
});