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

// router.get('/new', function(req, res, next) {
//   res.render('review', { title: 'GuestAdvisor' });
// });

// router.post('/new', function(req, res, next) {
// 	console.log(req.body)
// 	console.log('Name: ' + req.body.name);
// 	console.log('Rating: ' + req.body.rating);
// 	var name = req.body.name;
// 	var email = req.body.email;
// 	var review = req.body.review;
// 	var rating = req.body.rating;

// 	var newGuest = Guest({
// 	  name: name,
// 	  email: email,
// 	  review: review,
// 	  rating: rating
// 	});

//    newGuest.save(function(err) {
//      if (err) console.log(err);

//      res.send('New guest created!');
//     });


//     // res.end();
// });


module.exports = router;
