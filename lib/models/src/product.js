var _ = require('lodash');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var BaseSchema = require("../base");
var modelConfig = require("../config");

var STATES = ['pending', 'complete', 'failed'];
var FIVE_MINUTES = 1000 * 60 * 5;

module.exports = function createProductModel(arg) {
  var db = arg.connections.db;
  var cache = arg.connections.cache;
  var logger = arg.config.logger;
  var alias = "Product";

  var Schema = new BaseSchema({
    sku: { type: String, index: {unique: true, dropDups: true}},
    name: { type: String, index: true },
    timestamp: { type: Number, index: true},
    listPrice: { type: Number},
    salePrice: { type: Number},
    imageUrl: { type: String },
    linkUrl: { type: String },
    brand: { type: String },
    categories: [{
        name: String,
        id: String
    }],
    offers: [],
    ksps: []
  },{
    strict: true,
    _id: false
  });
  Schema.plugin(timestamps);

  Schema.statics.alias = alias;
  
  //define properties visible to non privlaged requests
  Schema.statics.cachePrefix = "product";
  Schema.statics.whiteList = modelConfig.product.attrWhiteList;
  
  Schema.post("update",function(doc){
    console.log("Product update hook");
  });

  Schema.post("save",function(doc){
    console.log("Product save hook");
  });

  Schema.post("remove",function(doc){
    console.log("Product delete hook");
  });

  var Product = db.model(alias, Schema);
  return Product;
};