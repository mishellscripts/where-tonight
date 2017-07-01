'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
	name: {type: String, required: true},
	location: {
	    display_address: {type: String, required: true},
	    city: {type: String, required: true},
	},
	price: {type: String},
	rating: {type: Number}, 
    rsvps: {type: Number, default: 0}
});

module.exports = mongoose.model('Bar', Bar);
