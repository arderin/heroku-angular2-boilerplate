var EventEmitter = require('events').EventEmitter;
var jackrabbit = require('jackrabbit');
var mongoose = require('mongoose');
var util = require("util");
var redis = require('redis');
var redisExpress = require('express-redis-cache');

function Connector(config) {
  EventEmitter.call(this);
  var logger = config.logger;
  var self = this;
  var readyCount = 0;
  
  this.db = mongoose.createConnection(config.mongo_url)
    .on('connected', function() {
      logger.log('info',{ msg: 'connected', service: 'mongodb' });
      ready();
    })
    .on('error', function(err) {
      logger.log('error',{ msg: err, service: 'mongodb' });
    })
    .on('close', function(str) {
      logger.log( 'error',{ msg: 'closed', service: 'mongodb' });
    })
    .on('disconnected', function() {
      logger.log('error', { msg: 'disconnected', service: 'mongodb' });
      lost();
    });

  this.rabbitmq = jackrabbit(config.rabbit_url)
    .on('connected', function() {
      logger.log('info',{  msg: 'connected', service: 'rabbitmq' });
      ready();
    })
    .on('error', function(err) {
      logger.log({ type: 'error', msg: err, service: 'rabbitmq' });
      if(readyCount < 3){
        //let app continue if rabbitmq is unavailable
        ready();
      }
    })
    .on('disconnected', function() {
      logger.log('error', { msg: 'disconnected', service: 'rabbitmq' });
      lost();
    });

  this.cache = redisExpress({ client: require('redis').createClient(process.env.REDIS_URL), prefix: "appCache" })
  .on('connected', function() {
    //logger.log('info',{  msg: 'connected', service: 'redis' });
    ready();
  })
  .on('error', function(err) {
    logger.log({ type: 'error', msg: err, service: 'redis' });
    if(readyCount < 3){
      //let app continue if redis is unavailable
      ready();
    }
  })
  .on('disconnected', function() {
    logger.log('error', { msg: 'disconnected', service: 'redis' });
    lost();
  })
  .on('message', function(message){
     logger.log('info',{  msg: message, service: 'redis' });
  });

  function ready() {
    if (++readyCount === 3) {
      self.emit('ready');
    }
  }

  function lost() {
    self.emit('lost');
  }
};

module.exports = function(config) {
  return new Connector(config);
};

util.inherits(Connector, EventEmitter);

