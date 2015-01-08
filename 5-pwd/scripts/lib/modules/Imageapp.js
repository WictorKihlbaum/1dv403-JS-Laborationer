"use strict";

define(function() {

	var Imageapp = {

		clicks: 0,

		init: function() {
			document.getElementById("imgApp").addEventListener("click", Imageapp.createWindow, false);
		},

		createWindow: function() {

			Imageapp.clicks += 1;

			if (Imageapp.clicks < 2) {

				var mainWindow = document.createElement("DIV");
					mainWindow.id = "mainWindow";
				var subWindow = document.createElement("DIV");
					subWindow.id = "subWindow";

				var closeWindowDiv = document.createElement("DIV");
				var closeWindow = document.createElement("A");
					closeWindow.href = "#";
				var closeWindowImg = document.createElement("IMG");
					closeWindowImg.id ="closeWindow";

					mainWindow.appendChild(subWindow);
					mainWindow.appendChild(closeWindowDiv);

					closeWindowDiv.appendChild(closeWindow);
					closeWindow.appendChild(closeWindowImg);
					closeWindowImg.setAttribute("src", "images/close.png");
					closeWindowImg.alt = "Close window";

				var mainWindowIcon = document.createElement("IMG");
					mainWindowIcon.id = "mainWindowIcon";
					mainWindowIcon.setAttribute("src", "images/appIcon.png")

				var mainWindowText = document.createElement("SPAN");
					mainWindowText.id = "mainWindowText";
					mainWindowText.innerHTML = "Image Application";

					mainWindow.appendChild(mainWindowIcon);
					mainWindow.appendChild(mainWindowText);

				var body = document.getElementsByTagName("body")[0];
					body.appendChild(mainWindow);

				closeWindow.onclick = function(e) {

					e.preventDefault();
					Imageapp.clicks = 0;
    				mainWindow.style.display = "none";
				}

			}
				
		},

	}

	return Imageapp;
});