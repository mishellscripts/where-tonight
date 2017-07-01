'use strict';

var Bar = require('./app/models/bars.js');
var User = require('./app/models/users.js');

function rsvpHandler (db) {

	var clicks = db.collection('rsvp');

	this.getRSVPS = function (req, res) {

		var rsvpProjection = { '_id': false };

		Bar.findOne({}, rsvpProjection, function (err, result) {
			if (err) {
				throw err;
			}

			res.json(result);
		});
	};
}

module.exports = rsvpHandler;