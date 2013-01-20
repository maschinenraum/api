// SPACE.js -- API module implementing SpaceAPI spec
// usage: var SPACE = require(./SPACE);

var door  = require("./door_status")
  , fs    = require('fs');

// 'SPACE' pseudo-class
// usage: via 'create' function
var SPACE = function(options) {
  // closure: this.argument <> argument
  this.options = options;
  
  //setup
  this.data = {};
  // this.data = {
  //     "status" : "Hello World"
  //   };
  this.data = JSON.parse(
    fs.readFileSync(this.options.staticInfoFile, 'utf8')
  );
  console.log(this.data);
};

SPACE.prototype.set = function (key, value) {
  if (arguments.length == 1) {
    return this.status[key];
  } else {
    this.status[key] = value;
    return this;
  };
};
SPACE.prototype.get = SPACE.prototype.set;

// 'create' function
// usage: var space = SPACE.create(options);
module.exports.create = function(options) {
  return new SPACE(options);
};