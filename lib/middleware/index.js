var security = require("./src/security.js");
var search =  require("./src/search.js");
var cache = require("./src/cache.js");

function AppMiddleWare(config, app) {


  var self = this;
  self.security = security(config);
  self.search = search(config);
  self.cache = cache(config, app);

}

module.exports = function(config, app) {
  return new AppMiddleWare(config, app);
};

