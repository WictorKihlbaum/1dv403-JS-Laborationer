"use strict";

require.config({
	paths: {
		"Desktop": "lib/modules/Desktop",
		"Imageapp": "lib/modules/Imageapp"
	}
});

require(["lib/modules/Desktop"], function(Desktop) {
	Desktop.init();
});