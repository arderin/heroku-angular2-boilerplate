var EventEmitter = require('events').EventEmitter;
var util = require("util");
var uuid = require('node-uuid');

var connections = require('./connections');
var hbs = require("./templates");
var models = require('./models');
var logger;

function App(config) {
	EventEmitter.call(this);
	var self = this;
	logger = config.logger;

	this.config = config;
	this.connections = connections(config);
	this.connections.once('ready', this.onConnected.bind(this));
  	this.connections.once('lost', this.onLost.bind(this));

  	//set up data models
	this.model = models({
		connections: this.connections,
		config: config
	});

	this.hbs = hbs;
	this.exchange = this.connections.rabbitmq.direct(config.message_exchange);
}

module.exports = function createApp(config) {
  return new App(config);
};

util.inherits(App, EventEmitter);

App.prototype.publishMessage = function(queue, message, key){
	logger.log('info', { msg: 'Publishing message to queue: ' + queue + " message:" + JSON.stringify(message)});
	message.id = message.id || uuid.v1();

	this.exchange.publish(message, { name: queue, key: key || "action" });
}

App.prototype.notifySubscribers = function(data){
	this.emit("publish", data);
}

App.prototype.onConnected = function() {
	logger.log('info', { msg: 'All connections made' });
	this.onReady();
};

App.prototype.onReady = function() {
	logger.log('info', { msg: 'app.ready' });
	this.emit("ready");
};

App.prototype.onLost = function() {
	logger.log('info', { msg: 'app.lost' });
	this.emit('lost');
};

