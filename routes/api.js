var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/user');
var Guest = require('../models/guest');
var Review = require('../models/review');
// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token


// route to show a random message (GET http://localhost:8080/api/)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

router.get('/guests', function(req, res) {
  console.log(req.query.term.term);
  Guest.find({email: new RegExp(req.query.term.term, "i")}, function(err, guests) {
    
  console.log(guests);
  if(err){
  console.log(err);
 }
    res.json(guests);
  });
});

router.get('/reviews', function(req, res) {
  Review.find({}, function(err, reviews) {
    res.json(reviews);
  });
});  
// apply the routes to our application with the prefix /api
app.use('/', router);
module.exports = router;


