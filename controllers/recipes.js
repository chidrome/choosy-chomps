require('dotenv').config();
var express = require('express');
var request = require('request');
var db = require('../models');
var bodyParser = require('body-parser');

var router = express.Router();

var recipeUrl = '';
var encoded = '';

//this calls the API and sets the URL according to 
//whether or not the user entered just a query string or 
//both a query string and a health option from the drop down
//on the home page and renders either an error if the search
//results don't find any hits or renders a page of the hits found
router.get('/', function(req, res) {
	var recipe = null;
	var queryString = req.query.search;
	var healthOption = req.query.selectionbox;

	//encodeURI() 
	if (!(healthOption === 'null')) {
		recipeUrl = 'https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&q=' + queryString + '&health=' + healthOption + '&to=100';
	} else {
		recipeUrl = 'https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&q=' + queryString + '&to=100';
	};
    request(recipeUrl, function(error, response, body) {
    	try {
    		recipe = JSON.parse(body);
    	} catch(e) {
    		res.status(400).render('recipes/404error'); 
    	};

        res.render('recipes/all', { recipe: recipe });
    });
});

//shows details of a specific recipe when gotten from profile
router.get('/:label', function(req, res) {
	var recipeLabel = req.params.label;
	var recipeUri = '';
	console.log('in get/:label route');
	db.favorite.find({where: {label: recipeLabel}}).then(function(data) {
		recipeUri = data.dataValues.uri;
		encoded = encodeURIComponent(recipeUri);
		recipeUrl = 'https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&r=' + encoded;
		request(recipeUrl, function(error, response, body) {
			recipe = JSON.parse(body);
			res.render('recipes/show', {recipe: recipe});
		});
	})
});

//shows details of a specific recipe when gotten from all.ejs
router.get('/show/:uri', function(req, res) {
	var recipeAPIUri = encodeURIComponent(req.params.uri);
	recipeAPIUrl = 'https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&r=' + recipeAPIUri;
	console.log(recipeAPIUrl);
	request(recipeAPIUrl, function(error, response, body) {
		recipe = JSON.parse(body);
		res.render('recipes/show', {recipe: recipe});
	});
});


module.exports = router;