require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session'); 
var passport = require('./config/ppConfig');
var isLoggedIn = require('./middleware/isLoggedIn');
var db = require('./models');

var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));


//takes an object of all the stuff you want to 
//store in the session for right now
app.use(session({
	//kind of like signing our session, makes it unique
	//from app to app
	//don't forget to npm install --save dotenv 
	//and do the line at line1
	secret: process.env.SESSION_SECRET,
	//save the session even if unmodified, set to false
	resave: false,
	//if the session is new but hasn't yet been changed, then save
	saveUninitialized: true
}));

//put these AFTER the session
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	//before every route, attach the flash messages
	//and current user to res.locals
	res.locals.alerts = req.flash();
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res) {
  res.render('index');
});

//check to see if user is logged in with isLoggedIn
//displays the user's favorites
app.get('/profile', isLoggedIn, function(req, res) {
	 db.favorite.findAll().then(function(recipe) {
	 	console.log(recipe);
    	res.render('profile', {recipe: recipe});
    })
});

app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/recipes', require('./controllers/recipes'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
