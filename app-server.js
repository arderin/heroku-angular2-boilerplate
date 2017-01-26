var bodyParser = require('body-parser');
var express = require('express');

var config = require('./lib/config');
var app = require('./lib');
var middleware = require("./lib/middleware");

//add express server to app
process.env.PWD = process.cwd()
var server = express();
var instance = app(config);


instance.on('ready', startWeb);

function startWeb(){
	// Set up webpp and api
	var webArgs = {
		config: config,
		server: server,
		app: instance,
		middleware: middleware(config, instance)
	};

	var jsonParser = bodyParser.json({ limit: '50mb'});
	server.use(jsonParser);
	
	//configure api routes
	require('./lib/api')(webArgs);
	//configure web routes
	require('./lib/web')(webArgs);

	//start app
	var port = process.env.PORT || 3000;
	server.listen(port, function(){
	  console.log("Express server listening on port %d in %s mode", process.env.PORT, server.settings.env);
	});
}



