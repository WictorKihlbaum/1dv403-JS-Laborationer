"use strict";

var myApp = {
		init:function(){

			var mess = new Message("Hej Hej", new Date());
			alert(mess);

			mess.setText("En annan text");
			alert(mess);
		}
};

window.onload = myApp.init;


	

	



