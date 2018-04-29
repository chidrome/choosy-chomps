var express = require('express');
var db = require('../models');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/', function(req, res) {
	db.favorite.count({where: {userId: currentUser.id}}).then(function(data) {
		console.log('this is the data passed back', data)
		if (data === 0) {
			$('#no-recipes').attr('display', 'none');
		};
	});
});

//edits the user's profile information
router.get('/edit/:id', function(req, res){
	db.user.findById(req.params.id).then(function(user) {
		res.render('profile/edit', {user: user});
	});
});

//puts the new edited profile info on the profile page
router.put('/new/:id', function(req, res) {
	db.user.update({
		name: req.body.name,
		bio: req.body.bio
	}, {
		fields: ['name', 'bio'],
		where: {id: req.params.id}
	}).then(function(user) {
		res.send('success');
	}).catch(function(error) {
		console.log(error);
	});
});

//adds a recipe to the favorites by gathering info
//from the hidden form values on all.ejs and then 
//it splits the ingredients into an array 
//and reloads the search page 
router.post('/', function(req, res) {
	db.favorite.create({
	    label: req.body.label,
	    imgUrl: req.body.image,
	    ingredients: req.body.ingredients.split(','),
	    url: req.body.url,
	    uri: req.body.uri,
	    userId: req.user.id
	}).then(function(data) {
		// console.log(data);
		res.redirect('back');
	}).catch(function(error) {
		console.log('this is the error ' + error);
	});
});

//deletes specific recipe
router.delete('/:label', function(req, res) {
	db.favorite.destroy({
		where: {label: req.params.label}
	}).then(function(data) {
		res.send('');
	});
});

module.exports = router;