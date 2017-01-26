var compression = require('compression');
var express = require('express');
var path = require('path');

module.exports = function(arg) {
	var server = arg.server;
	var config = arg.config;
	var hbs = arg.app.hbs;
	var cacheDuration = process.env.NODE_ENV !== "dev" ? 604800000: 0;

	//set global middleware
	server.use(compression());

	// Hook in express-hbs and tell it where known directories reside
	server.set('view engine', 'hbs');
	server.set('views', path.join(__dirname,'../templates/'));

	server.get('/robots.txt', function (req, res) {
	    res.type('text/plain');
	    res.send("User-agent: *\nDisallow: /");
	});

	/* server static assets*/
	server.use(express.static(__dirname + '/public', {
		maxAge: cacheDuration
	}));

	server.all('/*', function(req, res, next) {
		res.render('index', {
			dataLayer: {
				"auth": {
					"domain": config.auth.domain,
					"clientID": config.auth.clientID
				}
			}
		});
	});


};