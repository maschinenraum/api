// SPACE.js -- API module implementing SpaceAPI spec
// usage: var SPACE = require(./SPACE);

var door  = require('./door_status')
  , fs    = require('fs');

// 'SPACE' pseudo-class
// usage: via 'create' function
var SPACE = function(options) {
  // closure: this.argument <> argument
  this.options = options;
  
  //setup
  this.data = {};
  this.data = JSON.parse(
    fs.readFileSync(this.options.staticInfoFile, 'utf8')
  );
  this.data['api-host'] = process.env.APIHOST || "unknown";
  //console.info(this.data);
};

// define combined setter and getter; 'inspired' by mongoose
// usage: space.get()             -> gets all the data
//        space.get("open")       -> gets a property
//        space.set("open", true) -> sets a property
SPACE.prototype.set = function (key, value) {
  if        (arguments.length == 0) {
    return this.data;
  } else if (arguments.length == 1) {
    return this.data[key];
  } else {
    this.data[key] = value;
    return this;
  };
};
SPACE.prototype.get = SPACE.prototype.set;

// 'create' function
// usage: var space = SPACE.create(options);
module.exports.create = function(options) {
  return new SPACE(options);
};