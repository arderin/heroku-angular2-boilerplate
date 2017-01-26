var fs = require('fs');

function Models(arg) {
  var models = {};

 //get all model objects
 fs.readdirSync(__dirname + '/src').forEach(function(name){
  var m = require(__dirname + '/src/' + name)(arg);
  models[m.alias] = m;
 });

  return models;
}

module.exports = function(arg) {
  return Models(arg);
};