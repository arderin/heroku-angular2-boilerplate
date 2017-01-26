var config = require('./lib/config');
var app = require('./lib');
var logger = config.logger;

var cronJob = require('cron').CronJob;
var fs = require('fs');


var jobsDir = __dirname + '/lib/jobs/vendors/';
var instance = app(config);

instance.on('ready', scheduleCronJobs);

function scheduleCronJobs() {
	//start scheudle for all integrations
	fs.readdirSync(jobsDir).forEach(function(name) {
		var integration = require(jobsDir + name)(instance);
		integration.schedule();
	});
}