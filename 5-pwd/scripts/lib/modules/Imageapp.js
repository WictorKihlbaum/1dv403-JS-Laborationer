"use strict";

define(function() {

	var Imageapp = {

		windowsOpen: 0,
		url: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/",
		imageArray: [], 

		init: function() {
			Imageapp.createWindow();
			Imageapp.dragDropWindow();
		},

		createWindow: function() {

			Imageapp.windowsOpen += 1;

			if (Imageapp.windowsOpen < 2) {

				var body = document.getElementsByTagName("body")[0];
				var desktop = document.getElementById("desktop");

				var mainWindow = document.createElement("DIV");
					mainWindow.id = "mainWindow";

				var topBar = document.createElement("DIV");
					topBar.id = "topBar";

				var windowContainer = document.createElement("DIV");
					windowContainer.id = "windowContainer";

				var bottomBar = document.createElement("DIV");
					bottomBar.id = "bottomBar";

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

				// Place elements.
				body.appendChild(desktop);
				desktop.appendChild(mainWindow);

				mainWindow.appendChild(topBar);
				mainWindow.appendChild(windowContainer);
				mainWindow.appendChild(bottomBar);

				topBar.appendChild(closeWindowDiv);
				topBar.appendChild(mainWindowIcon);
				topBar.appendChild(mainWindowText);

				closeWindowDiv.appendChild(closeWindow);
				closeWindow.appendChild(closeWindowImg);

				// Close mainwindow.
				closeWindow.onclick = function() {

					Imageapp.windowsOpen = 0;
    				desktop.removeChild(mainWindow);
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
			
			var imageWindow = document.getElementById("windowContainer");
			var frameWidth = 0;
			var frameHeight = 0;
			
				for (var i = 0; i < response.length; i += 1) {

					var thumbImage = document.createElement("IMG");
						thumbImage.setAttribute("SRC", response[i].thumbURL);

					if (response[i].thumbWidth > frameWidth && response[i].thumbHeight > frameHeight) {

						frameWidth = response[i].thumbWidth;
						frameHeight = response[i].thumbHeight;
					}

					var imageFrame = document.createElement("DIV");
						imageFrame.className = "imageFrame";
						imageFrame.style.width = frameWidth + "px";
						imageFrame.style.height = frameHeight + "px";
					
					var imageFrameLink = document.createElement("A");
						imageFrameLink.href = "#";
						imageFrameLink.addEventListener("click", Imageapp.changeWallpaper, false);

					imageWindow.appendChild(imageFrameLink);
					imageFrameLink.appendChild(imageFrame);
					imageFrame.appendChild(thumbImage);
				}
		},

		changeWallpaper: function() {
			
			console.log(this);
			var lol = this.firstChild.firstChild.src;
				lol = lol.replace("/thumbs", "");

			var wallpaper = document.getElementById("desktop");
				wallpaper.style.backgroundImage = "url('"+lol+"')";

		},

		dragDropWindow: function() {		

			var offX;
			var offY;
			var div = document.getElementById("mainWindow");
			var handleTopbar = document.getElementById("topBar");
			var handleBottombar = document.getElementById("bottomBar");

			handleTopbar.addEventListener("mousedown", mouseDown, false);
			handleBottombar.addEventListener("mousedown", mouseDown, false);
			window.addEventListener("mouseup", mouseUp, false);

			function mouseUp() {

				window.removeEventListener("mousemove", divMove, true);
			}

			function mouseDown(e) {

				offY = e.clientY - parseInt(div.offsetTop);
				offX = e.clientX - parseInt(div.offsetLeft);

				window.addEventListener("mousemove", divMove, true);
			}

			function divMove(e) {

				e.preventDefault();
				div.style.position = "absolute";
				div.style.top = (e.clientY - offY) + "px";
				div.style.left = (e.clientX - offX) + "px";
			}
		},

	}

	return Imageapp;
});