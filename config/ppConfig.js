var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

//REMEMBER TO REQUIRE IN INDEX.JS and AUTH.JS: 
//var passport = require( this particular file )


// Passport "serializes" objects to make them easy 
//to store by converting the user to an identifier.
//to do this: (cb is callback)
passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

// Passport "deserializes" objects by taking the user's
// serialization id and looking it up in the database.
passport.deserializeUser(function(id, cb) {
	db.user.findById(id).then(function(user) {
		cb(null, user);
	}).catch(cb);
});

// Set up the local auth strategy 
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, cb){
	db.user.find({
		where: {email: email}
	}).then(function(user) {
		//if user is undefined or user's password is invalid...
		if(!user || !user.validPassword(password)) {
			cb(null, false);
		} else {
			//if successfully log in, returns the user
			//that has logged in. this is what will be 
			//used to store in our session
			cb(null, user);
		};
		//if any error, then call callback which will
		//push the program to the next thing that the 
		//app is supposed to do
	}).catch(cb);
}));

module.exports = passport;






