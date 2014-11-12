"use strict";

var MessageBoard = {

	messages: [],

	init:function(e)
	{
		var mess = new Message("Hej Hej", new Date());
		alert(mess);

		mess.setText("Hej igen");
		alert(mess);


		messages.push("wefd", "hej");
		console.log(messages);
	}


};

window.onload = MessageBoard.init;


	

	



