'use strict';

const path = process.cwd();
const Bar = require('../models/bars.js');
const User = require('../models/users.js');
var RSVPHandler = require(path + '/app/controllers/rsvpHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/auth/github');
		}
	}
	
	var rsvpHandler = new RSVPHandler();	

	const Yelp = require('node-yelp-fusion');
	const yelp = new Yelp({ id: process.env.CLIENT_ID , secret: process.env.CLIENT_SECRET });

	app.route('/')
		.get(function (req, res) {
			// If user is logged in, check if they have a previous saved location to search for
			if (req.isAuthenticated()) {
				User.findById(req.user.id, function(err, user) {
					// If location was entered previously before
					if (user.location) {
						yelp.search("term=bar&location=" + user.location)
							.then(function(result) {
								return res.render('index', {user: req.user, bars: result.businesses});
							}
						);
					} else {
						return res.render('index', {user: req.user});
					}
				})
			} else {
				return res.render('index', {user: req.user});
			}
		})
		// Search: Login not required for search
		.post(function (req, res) {
			if (req.body.location) {
			yelp.search("term=bar&location=" + req.body.location)
			    .then(function(result){
		    		if (req.isAuthenticated()) {
	    				User.findByIdAndUpdate(req.user._id, 
	    					{$set: {location: result.businesses[0].location.city}},
	    					function(err) {
	    						console.log(result.businesses[0].location.city);
	    					});
	    			}
		    		result.businesses.forEach(function(bar, index) {
		    			// Create new bar and save to the database
		    			const newBar = new Bar({ 
		    				name: bar.name, 
		    				location: {
		    					display_address: bar.location.display_address,
		    					city: bar.location.city
		    				},
		    				rating: bar.rating,
		    				barID: bar.id
		    			});
		    			newBar.save(function(err) {
		    				if (err) console.log(err.message);
		    			});
		    			
		    			if (index === result.businesses.length - 1) {
			           		res.render('index', {user: req.user, 
			           			location: result.businesses[0].location.city, 
			           			bars: result.businesses
			           		});
		    			}
		    		});
		    	});
			} else {
				res.send('invalid location');
			}
		});

	app.route('/bars')
		.get(function(req, res) {
			Bar.find({}, function(err, results) {
				res.send(results);
			})
		})
		
	app.route('/users')
		.get(function(req, res) {
			User.find({}, function(err, results) {
				res.send(results);
			})
		})		

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
	
	app.route('/api/get/:barID')
		.get(rsvpHandler.getClicks);
		
	app.route('/api/add/:barID')
		.get(isLoggedIn, rsvpHandler.getClicks)		
		.post(isLoggedIn, rsvpHandler.addClick);

	app.route('/api/remove/:barID')
		.get(isLoggedIn, rsvpHandler.getClicks)	
		.delete(isLoggedIn, rsvpHandler.removeClick);
};