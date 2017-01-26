var _ = require('lodash');
var moment = require('moment');
require('moment-timezone');

function ProductService(arg) {

	var self = this;
	var cache = arg.app.connections.cache;
 	var logger = arg.config.logger;


	this.getCacheDur = function(){
		//get seconds remaining till 3:30am the next day
		var secondsRemaining = (24*60*60) - moment().diff(moment().tz("America/Los_Angeles").hour(3).minute(30).second(0), 'seconds');
		return secondsRemaining;
	}

};

module.exports = function(arg) {
  return new ProductService(arg);
};