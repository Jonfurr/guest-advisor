var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var reviews = require('./routes/reviews');

var api = require('./routes/api')
var User = require('./models/user');
var Review = require('./models/review');
var Guest = require('./models/guest');

var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('before db search')
      User.findOne({ email: username }, function (err, user) {
        console.log('after db search')
        if (err) { return done(err); }
        if (!user) {
          console.log('user not found');
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password ) {
          console.log('password doesnt match')
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(user);
        return done(null, user);
      });
    }
  ));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/reviews', reviews)
app.use('/api', api);

app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(process.env.MONGO_DB_CONN_GUEST_ADVISOR); // connect to database



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
