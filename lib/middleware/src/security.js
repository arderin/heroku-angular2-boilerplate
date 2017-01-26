var _ = require('lodash');
var jwt = require('express-jwt');
var express = require('express');
var app = express();

function Security(config) {
  var self = this;

  var allowOrigins = config.allowOrigins;
  var jwtCheck = jwt({
    secret: config.auth.clientSecret,
    audience: config.auth.clientID,
    scope: "app_metadata"
  });

  self.auth = function(req, res, next) {
    //middleware to authenticate request
    jwtCheck.apply(this, arguments);
  }

  self.cors = function(req, res, next) {
    var origin = req.headers.origin;
    var allow = allowOrigins.indexOf(origin) > -1;

    allow && res.header("Access-Control-Allow-Origin", origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
  };

}

module.exports = function(config) {
  return new Security(config);
};