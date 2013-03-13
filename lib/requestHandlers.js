// modules
var querystring   = require('querystring')
  , fs            = require('fs')
  , SPACE         = require('./SPACE')
  , door          = require('./door_status');

// setup SPACE module with options
var spaceOptions = {
      staticInfoFile : "./data/maschinenraum.json",
}
  , space = SPACE.create(spaceOptions);

// GET / (home)
function home(app) {    
    console.log("Request handler 'home' was called.");
    
    // build response
    var body = 'NODE.JS SpaceAPI SERVER\n=======================\n\n';
    body += 'Space: ' + space.get('space') + ' -- ' + space.get('tagline');
    body += '\n\nMaybe you want to GET /resource.format';
    body += '\n\nResources: [ "status" ]';
    body += '\nFormats: [ "json", "txt" ]';
    body += '\nExample: /status.json';
    body += '\n\nSome static info:\n';
    body += JSON.stringify(space.get(), null, 2);
    
    // send response
    this.res.writeHead(200, {"Content-Type": "text/plain"});
    this.res.write(body);
    this.res.end();
    console.log("Response sent.");
}

// GET /status (SpaceAPI)
function spaceStatus(response, request, parameters) {
  
  var http = this;
  parameters = parameters || {};
  
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
      http.res.writeHead(200, {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
        // distinguish output formats
      console.log("Output format: " + parameters.format);
      if (parameters.format === ".json") {
          // make JSON from data object, send this as response
            // signature: JSON.stringify([theData], [aReplacerFunction], [theNumberOfSpaces]OR[aCharacterForIndent])
        http.res.write(JSON.stringify(space.get(), null, null)); 
      } else {
        http.res.write(JSON.stringify(space.get(), null, 2));
      }
      http.res.end();
      console.log("Response sent");
  } );
}

// export public methods
exports.home = home;
exports.spaceStatus = spaceStatus;