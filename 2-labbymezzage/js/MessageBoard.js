"use strict";

var MessageBoard = {

	messages: [],

	init:function()	{

		var messageButton = document.getElementById("messageButton");
		messageButton.addEventListener("click", sendMessage, false);

		function sendMessage() {

			var userInput = document.getElementById("textMessage");
			var userMessage = new Message(userInput.value, new Date());

				if (userInput.value != "")
				{
					MessageBoard.messages.push(userMessage);
					MessageBoard.renderMessage(MessageBoard.messages.length - 1)
					userInput.value = "";
				}
		}
	},

	renderMessages : function() {

		document.getElementById("sentMessages").innerHTML = "";

		for (var i = 0; i < MessageBoard.messages.length; ++i) {
			MessageBoard.renderMessage(i);
		}

	},

	renderMessage : function(messageID) {

		var sentMessages = document.getElementById("sentMessages");
		var messageDiv = document.createElement("div");
		var messageText = document.createElement("p");
		var messageTime = document.createElement("p");
		var buttonDiv = document.createElement("div");
		var showTime = document.createElement("a");
		var showTimeImg = document.createElement("img");
		var removeMessage = document.createElement("a");
		var removeMessageImg = document.createElement("img");

		showTime.href = "#";
		removeMessage.href = "#";

		messageDiv.className = "messageDiv";
		buttonDiv.className = "buttonDiv";
		showTimeImg.className = "showTimeImg";
		removeMessageImg.className = "removeMessageImg";
		messageTime.id = "messageTime";

		sentMessages.appendChild(messageDiv);
		messageDiv.appendChild(messageText);
		messageDiv.appendChild(messageTime);
		messageDiv.appendChild(buttonDiv);

		buttonDiv.appendChild(showTime);
		showTime.appendChild(showTimeImg);
		showTimeImg.setAttribute("src", "js/images/showTime.png");
		showTimeImg.alt = "Remove message";

		buttonDiv.appendChild(removeMessage);
		removeMessage.appendChild(removeMessageImg);
		removeMessageImg.setAttribute("src", "js/images/removeMessage.png");
		removeMessageImg.alt = "Show time";

		messageText.innerHTML = MessageBoard.messages[messageID].getText();
		messageTime.innerHTML = MessageBoard.messages[messageID].getDateText();

		removeMessage.onclick = function() {
			MessageBoard.removeMessage(messageID);
			MessageBoard.messageCounter();
		}

		showTime.onclick = function() {
			MessageBoard.showTime(messageID);
		}

		MessageBoard.messageCounter();
	},

	removeMessage : function(messageID) {

		MessageBoard.messages.splice(messageID, 1);
		MessageBoard.renderMessages();

	},

	showTime : function(messageID) {
		alert(MessageBoard.messages[messageID].toString());
	},

	messageCounter : function() {

		var messageAmount = MessageBoard.messages.length;
		var messageAmountDiv = document.getElementById("messageCounter");

		messageAmountDiv.innerHTML = "Antal skickade meddelanden:  " + messageAmount;

	},

};

window.onload = MessageBoard.init;
