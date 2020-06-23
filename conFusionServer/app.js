var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//our new routers
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoterRouter');
var leaderRouter = require('./routes/leaderRouter');

//connecting rest api with mongodb server
const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const Promotions = require('./models/promotion');
const Leaders = require('./models/leaders');
const { EDESTADDRREQ } = require('constants');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => {console.log(err); });
//ends here -----------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

//doing authentication right before user fetches data from the server
/*
function auth(req,res,next){
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if(!authHeader){
    var err = new Error('You are not autheticated!');
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    next(err);
  }
  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];

  if(username === 'admin' && password === 'password'){
    next();
  }
  else{
    var err = new Error('You are not autheticated!');
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    next(err);
  }
}
*/

//cookie parser auth function
/*
function auth(req,res,next){
  console.log(req.signedCookies);

  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;
    if(!authHeader){
      var err = new Error('you are not authenticated');

      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    if(username === 'admin' && password === 'password'){
      res.cookie('user', 'admin', {signed : true})
      next();
    }
    else{
      var err = new Error('You are not autheticated!');
      res.setHeader('WWW-Authenticate','Basic');
      err.status = 401;
      next(err);
    }
  }
  else{
    if(req.signedCookies.user === 'admin'){
      next();
    }
    else{
      var err = new Error('You are not autheticated!');
      err.status = 401;
      next(err);
    }
  }
}
*/

//express session auth function
function auth(req,res,next){
  console.log(req.session);

  if(!req.session.user){
    var authHeader = req.headers.authorization;
    if(!authHeader){
      var err = new Error('you are not authenticated');

      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    if(username === 'admin' && password === 'password'){
      req.session.user = 'admin';
      next();
    }
    else{
      var err = new Error('You are not autheticated!');
      res.setHeader('WWW-Authenticate','Basic');
      err.status = 401;
      next(err);
    }
  }
  else{
    if(req.session.user === 'admin'){
      next();
    }
    else{
      var err = new Error('You are not autheticated!');
      err.status = 401;
      next(err);
    }
  }
}

app.use(auth);
// ---------ends here ------------

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//new routers in use
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
