var fs = require('fs');

module.exports = function(arg) {
	//loop through controllers and register 
	 fs.readdirSync(__dirname + '/controllers').forEach(function(name){
	 	var controller = require(__dirname + '/controllers/' + name)(arg);
 	 });

};