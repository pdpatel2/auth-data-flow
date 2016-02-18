'use strict'; 

//customized body parser

var router = require('express').Router();

router.use(function (req, res, next) {
	var bodyString = '';
	req.on('data', function (chunk) {
		bodyString += chunk;
	});
	req.on('end', function () {
		bodyString = bodyString || '{}';
		//creates JSON object
		req.body = eval('(' + bodyString + ')');
		//create body property on request
		next();
	});
});

module.exports = router;