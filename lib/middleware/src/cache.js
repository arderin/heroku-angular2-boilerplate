function Cache(config, app) {
  var self = this;
  var searchKeyWords = {
    "sort": 1,
    "cursor": 1,
    "limit": 1,
    "select": 1,
    "distinct": 1
  }
  var MAX_AGE = 259200; //3 days

  self.browser = function(cacheAge) {

    function bwCache(req, res, next) {
      res.header("Cache-Control", "max-age="+cacheAge);
      next();
    }

    return bwCache;
  }
  
  self.mem = function(options){

    return function(req, res, next){
       var name = options.name || req.originalUrl;
       
       if(req.query.nc === "1"){
          next();
          return;
       }

       //check for specific params to use as name components
       if(options.paramNames){
        var nameParts = [];
        for(var i = 0; i < options.paramNames.length; i++){
          var key = options.paramNames[i];
          var p = req.params[key] || req.query[key];
          p && nameParts.push(p);
        }
        name = nameParts.join(",") || name;
       }

       if(options.prefix){
          res.express_redis_cache_name = [options.prefix,name].join(":");
       }else{
          res.express_redis_cache_name = name;
       }

       app.connections.cache.route({
        expire: {
          "200": MAX_AGE,
          "4xx": 5,
          "403": 5000,
          "5xx": 5,
          "xxx": 1
        }
       })(req, res, next);
    }
  }

}

module.exports = function(config, app) {
  return new Cache(config, app);
};