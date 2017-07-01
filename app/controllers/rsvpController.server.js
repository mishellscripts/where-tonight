var Bar = require('./app/models/bars.js');
var User = require('./app/models/users.js');

this.addRSVP = function (req, res) {
	Bar
		.findAndModify(
			{},
			{ '_id': 1 },
			{ $inc: { 'rsvps': 1 } },
			function (err, result) {
				if (err) { throw err; }

				res.json(result);
			}
		);
	User
		.findAndModify(
			{},
			{ '_id': 1 },
			{ $inc: { 'rsvps': 1 } },
			function (err, result) {
				if (err) { throw err; }

				res.json(result);
			}
		);	
};

this.resetClicks = function (req, res) {
	clicks
		.update(
			{},
			{ 'clicks': 0 },
			function (err, result) {
				if (err) { throw err; }

				res.json(result);
			}
		);
};