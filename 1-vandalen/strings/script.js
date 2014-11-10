"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		
		if (str.length > 0)
		{
			// Skapar tom textsträng för insparning av bokstäver.
			var text = "";

			for (var i = 0; i < str.length; i++) {
				// Alla Unicodevärden från '65 - 90' och '196 - 214' blir gemener. 
				if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90 || str.charCodeAt(i) >= 196 && str.charCodeAt(i) <= 214)
				{
					text += str.charAt(i).toLowerCase().replace(/a/g, "#");
				}
				else // Alla unicodevärden utanför ovan intervaller blir versaler.
				{
					text += str.charAt(i).toUpperCase().replace(/A/g, "#");
				}
			};

			return text;
		}
		else // Felmeddelande om användaren inte matar in något.
		{
			return ("Du måste mata in något!");
		}
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};