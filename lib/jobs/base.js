var EventEmitter = require('events').EventEmitter;
var util = require("util");

function BaseIntegration(app) {
	EventEmitter.call(this);

	var self = this;
	self.id = "BaseIntegration";
  	self.jobQueue = app.config.message_queue;
	self.cronJob = require('cron').CronJob;

	self.startJobs = function(){
		//set up listeners for jobs
		console.log("No jobs implemented for this integration: " + self.id)
	}

	self.schedule = function(){
		//set the schedule for all jobs
		console.log("No jobs schedule for this integration: " + self.id)
	}

	self.onFinished = function(data){
		self.emit("job_finished", data);
	}

}

util.inherits(BaseIntegration, EventEmitter);

module.exports = BaseIntegration;