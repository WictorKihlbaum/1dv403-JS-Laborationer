"use strict";

define(function() {

	var Desktop = {

		init: function() {
			Desktop.generateDesktop();
		},

		generateDesktop: function() {

			var body = document.getElementsByTagName("BODY")[0];
			var taskbar = document.createElement("DIV");
				taskbar.id = "taskbar";

			var imgApp = document.createElement("IMG");
				imgApp.id = "imgApp";
				imgApp.setAttribute("src", "images/appIcon.png");
				imgApp.alt = "Open image application";

			var openApp = document.createElement("A");
				openApp.href = "#";

			body.appendChild(taskbar);
			taskbar.appendChild(openApp);
			openApp.appendChild(imgApp);

			openApp.addEventListener("click", MessageBoard.sendMessage, false);
		},

	}

	return Desktop;
});