// modules
var querystring = require("querystring"),
    fs = require("fs"),
    door = require("./door_status");    

// public methods
// /start
function start(response) {    
    console.log("Request handler 'start' was called.");
    
    var body = 'OH HAI!';
    
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
            
            // Set 'WIP' property to true
            mrData.work_in_progress = true;
            
            
            // set the door status from twitter
            //mrData.open = null;
            door.get(function(result) {
                console.log("callback");
                mrData.open = result.door_open;
                
                // Set 'lastchange' timestamp to NOW
                mrData.lastchange = Math.round(new Date().getTime() / 1000);
                
                // build the response
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(JSON.stringify(mrData));
                response.end();
            } );
        }
    });
    
}

// export public methods
exports.start = start;
exports.info = info;