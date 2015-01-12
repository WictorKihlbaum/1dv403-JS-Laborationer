"use strict";

define(function() {

	var Desktop = {

		init: function() {
			Desktop.generateDesktop();
		},

		generateDesktop: function() {

			var body = document.getElementsByTagName("BODY")[0];
			var desktop = document.createElement("DIV");
				desktop.id = "desktop";

			var taskbar = document.createElement("DIV");
				taskbar.id = "taskbar";

			var imgApp = document.createElement("IMG");
				imgApp.id = "imgApp";
				imgApp.setAttribute("src", "images/appIcon.png");
				imgApp.alt = "Open image application";

			var openApp = document.createElement("A");
				openApp.href = "#";

			// Place the elements in Desktop.
			body.appendChild(desktop);
			desktop.appendChild(taskbar);
			taskbar.appendChild(openApp);
			openApp.appendChild(imgApp);

			// Call init for Imageapp.
			openApp.addEventListener("click", function() {
				require(["lib/modules/Imageapp"], function(Imageapp) {
					Imageapp.init();
				});
			});
		},

	}

	return Desktop;
});