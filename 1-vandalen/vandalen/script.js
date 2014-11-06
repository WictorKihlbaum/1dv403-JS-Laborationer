"use strict";

var makePerson = function(persArr) { 
	
	var result = {};
	// Hämtar ut och sorterar namnen från 'persArr'.
	var names = persArr.map(function (person){ return person.name; }).sort().join(", ");
	console.log(names);
	// Hämtar ut åldrar från 'persArr'.
	var ages = persArr.map(function (ages){ return ages.age;});
	console.log(ages);
	// Räknar ut maxåldern.
	var maxAge = ages.reduce(function(a,b){ return a+b;});
	console.log(maxAge);


	
	

// Lös uppgiften

return result; 

} 

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);