var express = require('express');
var db = require('../models');
var router = express.Router();

//edits the user's profile information
router.get('/edit/:id', function(req, res){
	db.user.findById(req.params.id).then(function(user) {
		res.render('profile/edit', {user: user});
	});
});

//puts the new edited profile info on the profile page
router.put('/edit/:id', function(req, res) {
	db.user.update({
		name: req.body.name,
		bio: req.body.bio
	}, {
		fields: ['name', 'bio'],
		where: {id: currentUser.id}
	}).then(function(user) {
		res.send('success');
	});
});

module.exports = router;