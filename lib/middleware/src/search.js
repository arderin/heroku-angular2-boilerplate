function Search(config) {
  var self = this;
  var searchKeyWords = {
    "sort": 1,
    "cursor": 1,
    "limit": 1,
    "select": 1,
    "distinct": 1
  }

  self.buildQuery = function(req, res, next) {
    var queryOptions = {
      filter: {}
    };
    var filterParam;

    //build query options
    for (var q in req.query) {
      if (q.toLowerCase() === "cursor") {
        queryOptions.filter["itemId"] = {
          $gt: req.query[q]
        };
      } else if (q.toLowerCase() in searchKeyWords) {
        queryOptions[q.toLowerCase()] = req.query[q];
      } else if(q.toLowerCase() !== "token"){ //ignore api token

        //treat other query parameters as filter options
        try {
          filterParam = JSON.parse(req.query[q])
        } catch (e) {
          filterParam = req.query[q].split(",");
          if (filterParam.length > 1) {
            filterParam = {
              $in: filterParam
            };
          } else {
            filterParam = filterParam[0];
          }
        }

        if (filterParam) {
          queryOptions.filter[q] = filterParam;
        }
      }
    }
    req.query = queryOptions;
    
    next();
  }

}

module.exports = function(config) {
  return new Search(config);
};