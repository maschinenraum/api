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
    body += "Space: " + space.get("space") + " -- " + space.get("tagline");
    body += '\n\nMaybe you want to GET /status.json';
    body += '\n\nSome static info:\n'
    body += JSON.stringify(space.get(), null, 2);
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(body);
    response.end();
}

// GET /status
function spaceStatus(response, request, parameters) {
  console.log("Request handler 'spaceStatus' was called.");
  
  door.get(space, function(result) {
      //console.info("callback");
      space.set("open", result.door_open);
      space.set("status", result.door_status);
                
      // Set 'lastchange' timestamp to time of tweet
      space.set("lastchange", Math.round(result.timestamp.getTime() / 1000));

      // Set 'generated_at' timestamp to NOW
      space.set("generated_at", Math.round(new Date().getTime() / 1000));
                
      // build the response
        // set HTTP headers
      response.writeHead(200, {
        'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
        // distinguish output formats
      console.log("Output format: " + parameters.format);
      if (parameters.format == ".txt") {
          // make JSON from data object, send this as response
            // signature: JSON.stringify([theData], [aReplacerFunction], [theNumberOfSpaces]OR[aCharacterForIndent])
        response.write(JSON.stringify(space.get(), null, 2)); 
      } else {
        response.write(JSON.stringify(space.get(), null, null))
      };
      response.end();
      console.log("Response sent");
  } );
};

// export public methods
exports.home = home;
exports.spaceStatus = spaceStatus;