var express = require('express');
var router = express.Router();
var Guest = require('../models/guest');
var Review = require('../models/review');
var mongoose = require('mongoose');
var app = express();


router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var guestName = req.params.name;
  var user= req.user;
  if (user) {
    Review.find().sort({'updated_at': 'desc'}).exec(function (err, reviews_main) {
      Review.find({guest_ID: id}, " ", function(err, reviews) {
        console.log(reviews)
        if (err) {console.log(err);}
          Guest.findOne({ _id:req.params.id }, " ", function(err, guests) {
            if (err) {console.log(err);}
              res.render('guest', {
                guest: guests,
                user: req.user,
                guestID : id, 
                guestName: guests.name,
                reviews: reviews,
                reviews_main: reviews_main });
        });
      });
    });
  }

  else {
    res.redirect('/login')
  }
      
});

router.post('/:id', function(req, res, next) {

  console.log('Review: ' + req.body.review);
  console.log('Rating: ' + req.body.rating);
  var review = req.body.review;
  var rating = req.body.rating;
  var guestName = req.body.guest_name;
  var user = req.user;
  console.log('ID: ' + req.params.id);

   var newReview = Review({
     comment: review,
     ind_rating: rating,
     user_ID: user.id,
     userName: user.name,
     guestName: guestName,
     guest_ID: req.params.id
   });

   newReview.save(function(err) {
     if (err) console.log(err);

     res.redirect('/users');
    });


});





app.use('/', router);
// module.exports = app;
module.exports = router;

