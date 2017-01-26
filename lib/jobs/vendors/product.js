var deferred = require('deferred');
var util = require("util");

var BaseIntegration = require("../base.js");
function ProductFeed(app) {
  BaseIntegration.apply(this, arguments);

  var self = this;
  var config = app.config;
  var model = app.model;
  var logger = config.logger;
  var cache = app.connections.cache;
  var crawlConfig = {
    debounceTime: 1500,
    batchSize: 50
  };

  self.id = "ProductFeed";
  self.jobActions = {
    "PROCESS_FEED": "process_product_feed"
  };

  self.startJobs = function() {
    app.on("publish", function(data) {
      if (data.action === self.jobActions.PROCESS_FEED) {
        //do something with product feed
      }
    });
  }

  self.schedule = function() {
    var productFeed = new self.cronJob('0 0 4 * * *', function() {
      app.publishMessage(self.jobQueue, {
        action: self.jobActions.PROCESS_FEED
      });
    }, null, true, 'America/Los_Angeles');
  }
}



util.inherits(ProductFeed, BaseIntegration);

module.exports = function(app) {
  return new ProductFeed(app);
};