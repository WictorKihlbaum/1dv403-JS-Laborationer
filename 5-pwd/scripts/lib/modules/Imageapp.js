"use strict";

define(function() {

	var Imageapp = {

		windowsOpen: 0,
		url: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/",
		imageArray: [], 

		init: function() {
			Imageapp.createWindow();
		},

		createWindow: function() {

			Imageapp.windowsOpen += 1;

			if (Imageapp.windowsOpen < 2) {

				var body = document.getElementsByTagName("body")[0];

				var mainWindow = document.createElement("DIV");
					mainWindow.id = "mainWindow";

				var subWindow = document.createElement("DIV");
					subWindow.id = "subWindow";

				var closeWindowDiv = document.createElement("DIV");
				var closeWindow = document.createElement("A");
					closeWindow.href = "#";
				var closeWindowImg = document.createElement("IMG");
					closeWindowImg.id ="closeWindow";
					closeWindowImg.setAttribute("src", "images/close.png");
					closeWindowImg.alt = "Close window";

				var mainWindowIcon = document.createElement("IMG");
					mainWindowIcon.id = "mainWindowIcon";
					mainWindowIcon.setAttribute("src", "images/appIcon.png")

				var mainWindowText = document.createElement("SPAN");
					mainWindowText.id = "mainWindowText";
					mainWindowText.innerHTML = "Image Application";

				// Place the elements.
				body.appendChild(mainWindow);

				mainWindow.appendChild(subWindow);
				mainWindow.appendChild(closeWindowDiv);
				mainWindow.appendChild(mainWindowIcon);
				mainWindow.appendChild(mainWindowText);

				closeWindowDiv.appendChild(closeWindow);
				closeWindow.appendChild(closeWindowImg);

				// Close window.
				closeWindow.onclick = function() {

					Imageapp.windowsOpen = 0;
    				body.removeChild(mainWindow);
				}

				Imageapp.getImages();
			}	
		},

		getImages: function() {

			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {

				if (xhr.readyState === 4 && xhr.status === 200) {

					Imageapp.presentImages(JSON.parse(xhr.responseText));
				}
				else {
					console.log("Läsfel! " + xhr.status);
				}
			}

		xhr.open("GET", Imageapp.url, true);
		xhr.send(null);
		},

		presentImages: function(response) {
			
			var imageWindow = document.getElementById("subWindow");
			

				for (var i = 0; i < response.length; i += 1) {

					var image = document.createElement("IMG");
						image.setAttribute("SRC", response[i].thumbURL);
						
					var imageFrame = document.createElement("DIV");
						imageFrame.className = "imageFrame";

					imageWindow.appendChild(imageFrame);
					imageFrame.appendChild(image);
				}
		},

	}

	return Imageapp;
});