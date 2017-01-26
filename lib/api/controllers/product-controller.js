var compression = require('compression');
var express = require('express');
var moment = require('moment');
require('moment-timezone');
var productService = require("../services/product-service.js");

module.exports = function(arg) {
	var logger = arg.config.logger;
	var server = arg.server;
	var app = arg.app;
	var Product = app.model.Product;
	var security = arg.middleware.security;
	var search = arg.middleware.search;
	var cacheMW = arg.middleware.cache;
	var ps = productService(arg);
	var cachePrefix = Product.cachePrefix;


	//declare api routes for private use
	var router = express.Router()


	router.get('/health', function(req, res) {
		res.json({
			message: 'Product api is healthy '
		});
	});

	router.get('/search', security.auth, search.buildQuery, function(req, res) {
		Product.search(req.query, req.isPrivlaged).then(function(resp) {
			return res.json(resp);
		}, function(error) {
			res.status(500).send(error);
		});
	});

	router.get('/:id', security.auth, function(req, res) {
		Product.getById(req.params.id).then(function(resp) {
			return res.json(resp);
		}, function(error) {
			res.status(500).send(error);
		});
	});

	server.use("/api/product", router);

	//declare api routes for public use
	var public = express.Router();
	public.use(compression());

	public.get('/:id', security.cors,
	cacheMW.browser(ps.getCacheDur()),
	cacheMW.mem({
		prefix: cachePrefix,
		paramNames: ["id", "select"]
	}),
	function(req, res) {
		Product.getById(req.params.id, req.isPrivlaged,req.query.select).then(function(resp) {
			return res.json(resp);
		}, function(error) {
			res.status(500).send(error);
		});
	});

	public.get('/', security.cors,
	cacheMW.browser(ps.getCacheDur()),
	cacheMW.mem({
		prefix: cachePrefix
	}),
	search.buildQuery,
	function(req, res) {
		Product.search(req.query, req.isPrivlaged).then(function(resp) {
			return res.json(resp);
		}, function(error) {
			res.status(500).send(error);
		});
	});

	server.use("/api/web/product", public);
};