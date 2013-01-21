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
  this.data['api_host'] = process.env.SPC_APIHOST || "unknown";
  //console.info(this.data);
};

// SPACE INTERFACE 

// usage: space.set("open", true) -> sets a property
SPACE.prototype.set = function (key, value) {
  if (arguments.length == 2) {
    this.data[key] = value;
    return this;
  };
};

// usage: space.get()                     -> return all the data in object
//        space.get('space')              -> "Maschinenraum"
//        space.get('space', 'tagline')   -> { space: 'Maschinenraum', tagline: 'we can haz raum' }
SPACE.prototype.get = function (keys) {
  var result = {};
  if (arguments.length == 0) {
    result = this.data;
  } else if (arguments.length == 1) {
    result = this.data[arguments[0]];
  } else {
    for (var i=0; i < arguments.length; i += 1) {
      var key = arguments[i];
      result[key] = this.data[key];
    };
  };
  return result;
};


// 'create' function
// usage: var space = SPACE.create(options);
module.exports.create = function(options) {
  return new SPACE(options);
};