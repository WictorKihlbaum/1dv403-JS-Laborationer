"use strict";

function Message(message, date) {

	this.getText = function() {
		return message;
	}

	this.setText = function(_text) {
		message = _text;
	}

	this.getDate = function() {
		return date;
	}

	this.setDate = function(_date) {
		date = _date;
	}


	Message.prototype.toString = function() {

		var date = this.getDate();

		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();

		var hour = Message.addZero(date.getHours());
		var minute = Message.addZero(date.getMinutes());
		var second = Message.addZero(date.getSeconds());

		return "Inlägget skapades den: " + " " + day + "/" + (month + 1) + " " + year + " klockan " + hour + " : " + minute + " : " + second;

	}

	Message.prototype.getHTMLText = function() {

	}

	Message.prototype.getDateText = function() {

		var date = this.getDate();
		var hour = Message.addZero(date.getHours());
		var minute = Message.addZero(date.getMinutes());
		var second = Message.addZero(date.getSeconds());

		return hour + " : " + minute + " : " + second;

	}

	Message.addZero = function(i) {

		if (i < 10) {
			i = "0" + i;
		}

		return i;
	}

}
