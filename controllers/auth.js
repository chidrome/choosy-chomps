var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
	db.user.findOrCreate({
		where: {email: req.body.email},
		defaults: {
			name: req.body.name,
			password: req.body.password
		}
	}).spread(function(user, created) {
		if(created === true) {
			//user not found in db, user created
			console.log('snailed it, user created');
			passport.authenticate('local', {
				successRedirect: '/',
				successFlash: 'Account created and logged in! :^)'
			})(req,res);
		} else {
			//email already exists in db
			console.log('email already exists');
			req.flash('error', 'Account already exists.');
			res.redirect('/auth/signup');
		}
	}).catch(function(error) {
		console.log('error occurred!');
		console.log(error.message);
		req.flash('error', error.message);
		res.redirect('/auth/signup');
	});
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

//POST ROUTE to /login 
//authenticates locally, then options object 
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	successFlash: 'You have logged in! :^)',
	failureRedirect: '/auth/login', //log in try again!
	failureFlash: 'Invalid username and/or password. :^( Please try again.'
}));

//GET request for LOGOUT
router.get('/logout', function(req,res) {
	req.logout();
	console.log('logged out');
	req.flash('success', 'You have logged out. See you next time!');
	res.redirect('/');
});





module.exports = router;
