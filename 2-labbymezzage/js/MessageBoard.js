"use strict";

var MessageBoard = {

	messages: [],

	init:function()	{

		// Hämtar värde från knappen i index och gör den klickbar.
		var messageButton = document.getElementById("messageButton");
		messageButton.addEventListener("click", MessageBoard.sendMessage, false);
		var userInput = document.getElementById("textMessage");

		// Gör möjligt att skicka meddelande med "enter-knappen", och radbyte med "shift + enter".
		userInput.addEventListener("keypress", function(e){
			if (!e){ e = window.event; }

				if (e.keyCode == 13 && !e.shiftKey) {
					 e.preventDefault();
					 MessageBoard.sendMessage();
				}
		});
	},

	sendMessage: function() {

		// Hämtar inmatat värde från meddelanderutan.
		var userInput = document.getElementById("textMessage");
		// Skapar nytt meddelande och skickar med inmatat värde samt tid.
		var userMessage = new Message(userInput.value, new Date());

		// Det går endast att skicka om meddelanderutan är tom.
		if (userInput.value != "")
			{
				MessageBoard.messages.push(userMessage);
				MessageBoard.renderMessage(MessageBoard.messages.length - 1);
				userInput.value = "";
				MessageBoard.messageCounter();
			}
		},

	renderMessages : function() {
		// Raderar samtliga meddelanden och skriver därefter ut resterande på nytt.
		document.getElementById("sentMessages").innerHTML = "";

		for (var i = 0; i < MessageBoard.messages.length; ++i) {
			MessageBoard.renderMessage(i);
		}

	},

	renderMessage : function(messageID) {

		// Skapar diverse element för HTML-dokumentet.
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

		// Skapar diverse klasser samt id för elementen.
		messageDiv.className = "messageDiv";
		buttonDiv.className = "buttonDiv";
		showTimeImg.className = "showTimeImg";
		removeMessageImg.className = "removeMessageImg";
		messageTime.id = "messageTime";

		// Placerar de olika elementen.
		sentMessages.appendChild(messageDiv);
		messageDiv.appendChild(messageText);
		messageDiv.appendChild(messageTime);
		messageDiv.appendChild(buttonDiv);

		// Placerar bild och länk för "klockknappen".
		buttonDiv.appendChild(showTime);
		showTime.appendChild(showTimeImg);
		showTimeImg.setAttribute("src", "js/images/showTime.png");
		showTimeImg.alt = "Remove message";

		// Placerar bild och länk för "Ta-bort-knappen".
		buttonDiv.appendChild(removeMessage);
		removeMessage.appendChild(removeMessageImg);
		removeMessageImg.setAttribute("src", "js/images/removeMessage.png");
		removeMessageImg.alt = "Show time";

		// Hämtar meddelandetext och tid från "Message"-klassen.
		messageText.innerHTML = MessageBoard.messages[messageID].getHTMLText();
		messageTime.innerHTML = MessageBoard.messages[messageID].getDateText();

		removeMessage.onclick = function() {

			// Visar valideringsmeddelande vid borttagning av meddelande.
			if (confirm("Är du säker på att du vill radera meddelandet?"))
			{ // Kallar därefter på metoderna för att ta bort samt räkna meddelanden.
				MessageBoard.removeMessage(messageID);
				MessageBoard.messageCounter();
			}
		}

		// Kallar på "Visa tid"-funktion.
		showTime.onclick = function() {
			MessageBoard.showTime(messageID);
		}

	},

	removeMessage : function(messageID) {

		// Tar bort meddelande och skriver därefter ut resterande på nytt.
		MessageBoard.messages.splice(messageID, 1);
		MessageBoard.renderMessages();
		
	},

	// Visar alert-ruta med tidangivelse vid klick på klockan.
	showTime : function(messageID) {
		alert(MessageBoard.messages[messageID].toString());
	},

	messageCounter : function() {

		// Meddelanderäknar-funktion som kollar längden på arrayen.
		var messageAmount = MessageBoard.messages.length;
		var messageAmountDiv = document.getElementById("messageCounter");

		// Skickar därefter tillbaka värde till index-sidan.
		messageAmountDiv.innerHTML = "Antal skickade meddelanden:  " + messageAmount;

	},

};
// Läser in JavaScriptet först när webbsidan laddat klart.
window.onload = MessageBoard.init;
