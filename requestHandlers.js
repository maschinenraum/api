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
    console.log(space.get("space"));
    
    var body = "";
    body += space.get("space");
    body += '\n\nMaybe you want to GET /status.json';
    body += '\n\nSome static info:\n'
    body += JSON.stringify(space.get(), null, 2);
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(body);
    response.end();
}

// GET /status.json
    
    // get json file from file system (it has the static info)
    fs.readFile("./data/maschinenraum.json", "binary", function(error, file) {
        if(error) {
            // In case of error, we respond with error
            response.writeHead(500, {"Content-Type": "text/plain" });
            response.write("Error 500");
            response.write("Could not get download static file.");
            response.write("Message: " + error + "\n");
            response.end();
        } else {
            // If there is no error, we continue
            
            // Read the downloaded file into JS object
            var mrData = JSON.parse(file);
            //console.log(file);
            //console.log(mrData);
            
            // DEV: Set 'WIP' property to true
            //mrData.work_in_progress = true;
            
            
            // set the door status from twitter
              // set `open` to `null` in case of error (it is a mandatory field)
            mrData.open = null;
            door.get(function(result) {
                console.log("callback");
                mrData.open = result.door_open;
                mrData.status = result.door_status;
function spaceStatus(response) {
  console.log("Request handler 'spaceStatus' was called.");
                
                // Set 'lastchange' timestamp to time of tweet
                mrData.lastchange = Math.round(result.timestamp.getTime() / 1000);

                // Set 'generated_at' timestamp to NOW
                mrData.generated_at = Math.round(new Date().getTime() / 1000);
                
                // build the response
                  // set HTTP headers
                response.writeHead(200, {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache',
                  'Access-Control-Allow-Origin': '*'
                });
                  // make JSON from data object, send this as response
                    // signature: JSON.stringify([theData], [aReplacerFunction], [theNumberOfSpaces]OR[aCharacterForIndent])
                response.write(JSON.stringify(mrData, null, 2)); 
                response.end();
            } );
        }
    });
    
}

// export public methods
exports.home = home;
exports.spaceStatus = spaceStatus;