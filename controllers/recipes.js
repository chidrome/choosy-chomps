require('dotenv').config();
var express = require('express');
var request = require('request');
var db = require('../models');
var bodyParser = require('body-parser');

var router = express.Router();

var recipeUrl = '';

router.get('/', function(req, res) {
	var recipe = null;
	var queryString = req.query.search;
	var healthOption = req.query.selectionbox;
	if (!(healthOption === 'null')) {
		recipeUrl = 'https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&q=' + queryString + '&health=' + healthOption;
	} else {
		recipeUrl = 'https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&q=' + queryString;
	};
    console.log(recipeUrl);
    request(recipeUrl, function(error, response, body) {
    	recipe = JSON.parse(body);
        console.log(recipe);
        res.render('recipes/all', { recipe: recipe });
    });
});

module.exports = router;