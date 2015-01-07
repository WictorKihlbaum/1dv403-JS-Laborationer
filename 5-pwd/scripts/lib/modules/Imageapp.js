"use strict";

define(function() {

	var Imageapp = {

		init: function() {
			Imageapp.createElements();
		},

		createElements: function() {

			var imgAppDiv = document.createElement("div");
				imgAppDiv.id = "imgApp";
			var imgAppImg = document.createElement("img");
			var imgAppStart = document.createElement("a");
				imgAppStart.href = "";
			var taskbar = document.getElementById("taskbar"); 
				taskbar.appendChild(imgAppDiv);

			imgAppDiv.appendChild(imgAppStart);
			imgAppStart.appendChild(imgAppImg);
				imgAppImg.setAttribute("src", "images/appIcon.png");
				imgAppImg.alt = "Image App Link";
				
		},

	}

	return Imageapp;
});