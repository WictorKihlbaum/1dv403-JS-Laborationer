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
					mainWindowIcon.setAttribute("SRC", "images/appIcon.png");

				var mainWindowText = document.createElement("SPAN");
					mainWindowText.id = "mainWindowText";
					mainWindowText.innerHTML = "Image Application";

				// Place the elements.
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

				// Close window.
				closeWindow.onclick = function() {

					Imageapp.windowsOpen = 0;
    				desktop.removeChild(mainWindow);
				}

				Imageapp.getImages();
			}	
		},

		getImages: function() {

			// Create and place loading screen.
			var windowContainer = document.getElementById("windowContainer");

			var loadingDiv = document.createElement("DIV");
				loadingDiv.id = "loadingDiv";

			var loadingGif = document.createElement("IMG");
				loadingGif.setAttribute("SRC", "images/loading.gif");
				loadingGif.id = "loadingGif";

			var loadingText = document.createElement("P");
				loadingText.id = "loadingText";
				loadingText.innerHTML = "Loading";

				windowContainer.appendChild(loadingDiv);
				loadingDiv.appendChild(loadingGif);
				loadingDiv.appendChild(loadingText);

			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {

				if (xhr.readyState === 4 && xhr.status === 200) {

					windowContainer.removeChild(loadingDiv);
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

					// Calculate width and height for the frames.
						if (response[i].thumbWidth > frameWidth && response[i].thumbHeight > frameHeight) {

							frameWidth = response[i].thumbWidth;
							frameHeight = response[i].thumbHeight;
						}
				}

				for (var i = 0; i < response.length; i += 1) {

					// Creates an image for each thumbimage and sets the correct URL.
					var thumbImage = document.createElement("IMG");
						thumbImage.setAttribute("SRC", response[i].thumbURL);

					

					// Creates a frame for each thumbimage.
					var imageFrame = document.createElement("DIV");
						imageFrame.className = "imageFrame";
						imageFrame.style.width = frameWidth + "px";
						imageFrame.style.height = frameHeight + "px";
					
					// Makes the frames clickable.
					var imageFrameLink = document.createElement("A");
						imageFrameLink.href = "#";
						imageFrameLink.addEventListener("click", Imageapp.changeWallpaper, false);

					// Place the elements.
					imageWindow.appendChild(imageFrameLink);
					imageFrameLink.appendChild(imageFrame);
					imageFrame.appendChild(thumbImage);
				}
		},

		changeWallpaper: function() {

			// Gets the URL for the thumbimage and removes the "/thumbs" from it.
			var changeImg = this.firstChild.firstChild.src;
				changeImg = changeImg.replace("/thumbs", "");

			// Sets the chosen image as background.
			var wallpaper = document.getElementById("desktop");
				wallpaper.style.backgroundImage = "url('" + changeImg + "')";
				wallpaper.style.backgroundSize = "auto";
				wallpaper.style.backgroundRepeat = "repeat";
		},

		dragDropWindow: function() {		

			var offX;
			var offY;
			var mainWindow = document.getElementById("mainWindow");
			var handleTopbar = document.getElementById("topBar");
			var handleBottombar = document.getElementById("bottomBar");

			// Makes it only possible to grab the windows topbar or bottombar.
			handleTopbar.addEventListener("mousedown", mouseDown, false);
			handleBottombar.addEventListener("mousedown", mouseDown, false);
			window.addEventListener("mouseup", mouseUp, false);

			function mouseUp() {

				window.removeEventListener("mousemove", windowMove, true);
			}

			function mouseDown(e) {

				offY = e.clientY - parseInt(mainWindow.offsetTop);
				offX = e.clientX - parseInt(mainWindow.offsetLeft);

				window.addEventListener("mousemove", windowMove, true);
			}

			function windowMove(e) {

				// Sets the position of the window.
				e.preventDefault();
				mainWindow.style.position = "absolute";
				mainWindow.style.top = (e.clientY - offY) + "px";
				mainWindow.style.left = (e.clientX - offX) + "px";

				// Limits the draggable area.
				if (parseInt(mainWindow.offsetTop) < 0) {
					mainWindow.style.top = 0 + "px";
				}
				else if (parseInt(mainWindow.offsetTop) > 225) {
					mainWindow.style.top = 225 + "px";
				}

				if (parseInt(mainWindow.offsetLeft) < 0) {
					mainWindow.style.left = 0 + "px";
				}
				else if (parseInt(mainWindow.offsetLeft) > 880) {
					mainWindow.style.left = 880 + "px";
				}
			}
		},

	}

	return Imageapp;
});