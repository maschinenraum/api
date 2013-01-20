// SPACE.js -- API module implementing SpaceAPI spec 
var door = require("./door_status");

// 'SPACE' pseudo-class
var SPACE = function(name) {
  // closure: this.argument <> argument
  this.name = name;
  
  //setup
  this.status = {};
  this.status = {
    "status" : "Hello World"
  };
  this.status.name = name;
};

// defince combined setter and getter; 'inspired' by mongoose
SPACE.prototype.set = function (key, value) {
  if (arguments.length == 1) {
    return this.status[key];
  } else {
    this.status[key] = value;
    return this;
  };
};
SPACE.prototype.get = SPACE.prototype.set;


module.exports.create = function(name) {
  return new SPACE(name);
};