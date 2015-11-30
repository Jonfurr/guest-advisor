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
		var user = req.user
		if (user) {
			Review.find().sort({'updated_at': 'desc'}).exec(function (err, reviews_main) {    
				Review.find({user_ID: user.id}, " ", function(err, reviews) {
				    if (err) console.log(err);
				res.render('user', { user: req.user, reviews: reviews, reviews_main : reviews_main });
				});
			});
		}
		else {
			res.redirect('/');
		}
	});

	router.get('/:id', function(req, res, next) {
  		var id = req.params.id;
  		var guestName = req.params.name;
  		var user= req.user;
  		if (user) {
		    Review.find().sort({'updated_at': 'desc'}).exec(function (err, reviews_main) {
		      Review.find({user_ID: id}, " ", function(err, reviews) {
		        if (err) {console.log(err);}
		          User.findOne({ _id:req.params.id }, " ", function(err, users) {
		            if (err) {console.log(err);}
		              res.render('user', {
		                user: user,
		                userID : id, 
		                userName: users.name,
		                reviews: reviews,
		                reviews_main: reviews_main });
		        });
		      });
		    });
		  }
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
	});

	router.get('/logout', function(req, res) {
	    req.logout();
	    res.redirect('/');
	});


module.exports = router;