var winston = require('winston');
require('winston-loggly');

//patch winston to enforce log format
winston.add(winston.transports.Loggly, {
	token: "loggly-token",
	subdomain: "appname",
	tags: ["Winston-NodeJS"],
	json: true
});

var ogLog = winston.log;
winston.log = function() {
	if (arguments.length > 1 && typeof arguments[1] === "object") {
		//enforcec id
		arguments[1].source = "wd-app"
	}
	if (process.env.NODE_ENV === "dev") {
		console.log(arguments[0], arguments[1]);
	} else {
		ogLog.apply(this, arguments);
	}
}



var config = module.exports = {

	auth: {
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET
	},
	//Services
	redis_url: process.env.REDIS_URL,
	mongo_cache: (process.env.MONGO_CACHE && int(process.env.MONGO_CACHE)) || 10000,
	mongo_url: process.env.MONGODB_URI,
	rabbit_url: process.env.CLOUDAMQP_URL,
	logger: winston,
	//App behavior
	worker_concurrency: process.env.WORKER_CONCURRENCY || 1,
	message_queue: "app-messages",
	message_exchange:"app-exchange",
	max_concurrency: 10,
	"allowOrigins": [""]
};
