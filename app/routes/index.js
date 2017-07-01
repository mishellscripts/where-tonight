'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	const Yelp = require('node-yelp-fusion');
	const yelp = new Yelp({ id: process.env.CLIENT_ID , secret: process.env.CLIENT_SECRET });

	app.route('/')
		.get(function (req, res) {
			res.render('index', {user: req.user});
		})
		// Search: Login not required for search
		.post(function (req, res) {
			console.log(req.body);
			yelp.search("term=bar&location=" + req.body.location)
			    .then(function(result){
			    		//res.send(result);
			           res.render('index', {user: req.user, location: req.body.location, bars: result.businesses});
			        });
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/' // add error message
		}));

};