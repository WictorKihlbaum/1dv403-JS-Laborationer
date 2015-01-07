"use strict";

require.config({
	paths: {
		"Imageapp": "lib/modules/Imageapp"
	}
});

require(["lib/modules/Imageapp"], function(Imageapp) {
	Imageapp.init();
});