var http = require('http');
var throng = require('throng');
var config = require('./lib/config');
var logger = config.logger;
var app = require('./lib');
var fs = require('fs');

http.globalAgent.maxSockets = Infinity;
throng(start, { workers: config.worker_concurrency, lifetime: Infinity });


function start() {
  var instance = app(config);
  var jobsDir = __dirname + '/lib/jobs/vendors/';
  var exchange  = instance.connections.rabbitmq.direct(config.message_exchange);

  logger.log('info', {
    msg: 'starting worker',
    concurrency: config.worker_concurrency
  });

  instance.on('ready', beginWork);
  instance.on('job_finished', workFinished);
  process.on('SIGTERM', shutdown);

  function startJobs(){

    //consume message queue
    var q = exchange.queue({
      name: config.message_queue,
      keys: ["action"],
      durable: true
    });
    q.consume(function(data, ack){
      logger.log("info", { msg: "queue: " + q.name + " consuming action " + data.action});
      instance.notifySubscribers(data);
      ack();
    });

    //start jobs for all integrations
    fs.readdirSync(jobsDir).forEach(function(name){
      var integration = require(jobsDir + name)(instance);
      integration.startJobs();
      integration.on('job_finished', workFinished);
    });
  }

  function beginWork() {
    instance.on('lost', shutdown);
    startJobs();
  }

  function workFinished(type){
    logger.log('info', { msg: 'completed job ' + type });
  }

  function shutdown() {
    logger.log('info', { msg: 'shutting down' });
    process.exit();
  }
}

