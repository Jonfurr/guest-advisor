var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/user');
var Guest = require('../models/guest');
var Review = require('../models/review')
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
	
	router.get('/', function(req, res, next) {
		res.render('user', { user : req.user });
	});

	router.post('/', function(req, res, next){
		var name = req.body.name;
		var email = req.body.email;
		var user = req.user;

		Guest.findOne({email: email}, " ", function(err, guest){

			if(err) console.log(err);

			if (guest){
				console.log("if statement");
				res.redirect('/guests/' + guest.id);
			}

			else {
				var newGuest = Guest({
				 name: name,
				 email: email
				});

				newGuest.save(function(err) {
				if (err) console.log(err);
					Guest.findOne({email: email}, " ", function(err, guest){

					if(err) console.log(err);

						console.log("else statement");
						res.redirect('/guests/' + guest.id);

					});

				});
			}

		});
		// var review = req.body.review;
		// var rating = req.body.rating;

	});

	router.get('/logout', function(req, res) {
	    req.logout();
	    res.redirect('/');
	});


module.exports = router;