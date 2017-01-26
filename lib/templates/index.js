var _ = require("lodash");
var Handlebars = require('hbs');
var moment = require('moment');
var numeral = require('numeral');

Handlebars.registerPartials(__dirname + '/partials');

Handlebars.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    return moment(new Date(datetime)).tz("America/Los_Angeles").format('MM/DD/YY, h:mm');
  }
  else {
    return datetime;
  }
});

Handlebars.registerHelper("formatCurrency", function(value, currencySymbol) {
  if(!currencySymbol || typeof currencySymbol !== "string"){
    currencySymbol = "$";
  }
  try{
    value = typeof value === "string" ? value.replace(/[^\d.-]/g, "") * 1: value;
    return currencySymbol + numeral(value).format('0,0.00');
  }catch(e){
    return currencySymbol + "0.00";
  }
  
});

Handlebars.registerHelper("inc",function(value, options) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("everyOther", function (index, amount, scope) {
    if ( ++index % amount ) 
        return scope.inverse(this);
    else 
        return scope.fn(this);
});

Handlebars.registerHelper("defaultValue", function (value, def) {
    return value || def;
});

Handlebars.registerHelper('toJSON', function(object){
  return new Handlebars.SafeString(JSON.stringify(object));
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

// limit an array to a maximum of elements (from the start)
Handlebars.registerHelper('limit', function (arr, limit) {
  if (!_.isArray(arr)) { return []; } // remove this line if you don't want the lodash/underscore dependency
  return arr.slice(0, limit);
});


/*helper functions*/
function addParam(url, param, value) {
    var urlParts = url.split("#");
    var hash = urlParts.length > 1 ? "#" + urlParts[1] : "";
    var baseUrl = urlParts[0];
    var separator = (baseUrl.indexOf("?")===-1)?"?":"&",
    newParam=separator + param + "=" + value;
    newUrl=baseUrl.replace(newParam,"");
    newUrl+=newParam;
    return newUrl + hash;
}


module.exports = Handlebars;