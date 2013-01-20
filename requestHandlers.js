// modules
var querystring = require("querystring"),
    fs = require("fs"),
    SPACE = require("./SPACE"),
    door = require("./door_status");

// setup SPACE module with options
var spaceOptions = {
      staticInfoFile : "./data/maschinenraum.json",
};
var space = SPACE.create(spaceOptions);

// GET /
function home(response) {    
    console.log("Request handler 'home' was called.");
    
    var body = "NODE.JS SpaceAPI SERVER\n=======================\n\n";
    body += "Space: " + space.get("space") + " — " + space.get("tagline");
    body += '\n\nMaybe you want to GET /status.json';
    body += '\n\nSome static info:\n'
    body += JSON.stringify(space.get(), null, 2);
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(body);
    response.end();
}

// GET /status.json
function spaceStatus(response) {
  console.log("Request handler 'spaceStatus' was called.");
  
  door.get(function(result) {
      console.log("callback");
      space.set("open", result.door_open);
      space.set("status", result.door_status);
                
      // Set 'lastchange' timestamp to time of tweet
      space.set("lastchange", Math.round(result.timestamp.getTime() / 1000));

      // Set 'generated_at' timestamp to NOW
      space.set("generated_at", Math.round(new Date().getTime() / 1000));
                
      // build the response
        // set HTTP headers
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
        // make JSON from data object, send this as response
          // signature: JSON.stringify([theData], [aReplacerFunction], [theNumberOfSpaces]OR[aCharacterForIndent])
      response.write(JSON.stringify(space.get(), null, 2)); 
      response.end();
  } );
};

// export public methods
exports.home = home;
exports.spaceStatus = spaceStatus;