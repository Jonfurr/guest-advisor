var express = require('express');
var router = express.Router();
var Review = require('../models/review');


router.get('/', function(req, res, next) {
	var user = req.user
		if (user) {
			Review.find().sort({'updated_at': 'desc'}).exec(function (err, reviews_main) {    
				Review.find({user_ID: user.id}, " ", function(err, reviews) {
				    if (err) console.log(err);
				res.render('review', { user: req.user, reviews: reviews, reviews_main : reviews_main });
				});
			});
		}
		else {
			res.redirect('/login');
		}
});

module.exports = router;
