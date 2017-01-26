var _ = require('lodash');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var BaseSchema = require("../base");
var modelConfig = require("../config");

module.exports = function createSettingsModel(arg) {
  var db = arg.connections.db;
  var cache = arg.connections.cache;
  var logger = arg.config.logger;
  var alias = "Settings";

  var Schema = new BaseSchema({
    key: { type: String, index: true, required: true, unique: true },
    startDate: { type: Date, default: Date.now},
    endDate: { type: Date},
    config: {}
  }, {
    strict: true
  });
  Schema.plugin(timestamps);
  Schema.statics.alias = alias;
  
  Schema.statics.get = function(key){
    var filter = {"key": key}
    console.log("find me this", key);
    return this.findOne(filter);
  }

  Schema.statics.set = function(key, value){
    var newConfig = new Settings({
        key: key,
        config: value|| ''
    });
    
    newConfig.save(callback);
  }

 

  var Settings = db.model(alias, Schema);
  return Settings;
};