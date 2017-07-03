'use strict';

var Bar = require('../models/bars.js');
var CircularJSON = require('circular-json');
 
function RSVPHandler () {

	this.getClicks = function (req, res) {
		Bar
			.findOne({ 'barID': req.params.barID })
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result.rsvps);
			});
	};

	this.addClick = function (req, res) {
		Bar
			.findOneAndUpdate({'barID': req.params.barID}, { $inc: { 'rsvps': 1 } })
			.exec(function (err, result) {
					if (err) { throw err };
					res.json(result.rsvps);
				}
			);
	};

	this.removeClick = function (req, res) {
		Bar
			.findOneAndUpdate({'barID': req.params.barID}, { $inc: {'rsvps': -1 }})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result.rsvps);
				}
			);
	};

}

module.exports = RSVPHandler;
