"use strict";

	var makePerson = function(persArr) { 
		
		var result = {};

		// Hämtar ut och sorterar ( Svenska tecken medräknat ) namnen från 'persArr'.
		var names = persArr.map(function (names){ return names.name; }).sort(function(a, b) { return a.localeCompare(b) }).join(", ");

		// Hämtar ut åldrar från 'persArr'.
		var ages = persArr.map(function (ages){ return ages.age;});

		// Räknar ut antalet personer.
		var persons = persArr.length;

		// Adderar alla åldrar... 
		var averageAge = ages.reduce(function(a,b){ return a+b;});

		// ...och räknar därefter ut  ( avrundat ) medelvärde.
		averageAge /= persons;
		averageAge = Math.round(averageAge);

		// Hämtar ut minsta ålder.
		var minAge = Math.min.apply(Math, ages);

		// Hämtar ut högsta ålder.
		var maxAge = Math.max.apply(Math, ages);

		// Adderar variabelvärden.
		result.minAge = minAge;
		result.maxAge = maxAge;
		result.averageAge = averageAge;
		result.names = names;

	return result; 

	} 

	var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

	var result = makePerson(data);

	console.log(result);
