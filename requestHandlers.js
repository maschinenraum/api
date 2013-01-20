// modules
var querystring = require("querystring"),
    fs = require("fs"),
    door = require("./door_status");    

// public methods
// /start
function start(response) {    
    console.log("Request handler 'start' was called.");
    
    var body = 'OH HAI!';
    body += '\n\nMaybe you want to GET /status.json';
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(body);
    response.end();
}

// spaceapi: output JSON
function info(response) {
    console.log("Request handler 'info' was called.");
    
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
exports.start = start;
exports.info = info;