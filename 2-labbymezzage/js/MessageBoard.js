"use strict";

var MessageBoard = {

	messages: [],

	init:function(e)
	{
		/* var mess = new Message("Hej Hej", new Date());
		alert(mess);

		mess.setText("Hej igen");
		alert(mess); */

		MessageBoard.messages.push("hej hej hej", "du", "ni");
		console.log(MessageBoard.messages);
	}
	
};

window.onload = MessageBoard.init;


	

	



