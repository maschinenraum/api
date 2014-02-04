var https = require('https');

// get live door status
// TODO: move to own backend before API v1 is shut down

function getDoorStatus(space, callback) {
    console.log("Door status need to be determined.");
    
    // HTTPS request
    var options = {
      host : 'api.twitter.com',
      port : 443,
      path : '/1/users/show.json?screen_name=mr_door_status',
    };
    console.log("GET latest door tweets from " + options.host);
    
    // declare vars 
    var data = ""         // to pass around the received data
      , dataObj = {}      // object to hold parsed data
      , result = {}       // result to give back to callback function
      , doorString = "";  // string to hold twitter status to 'grep'
    
    var request = https.request(options, function(res) {
        res.setEncoding('utf8');
        
        // listener: do stuff when data arrives
        res.on('data', function(chunk) {
            // reading in the data in chunks
            data += chunk;
        });
        
        // listener: do stuff when request had error
        res.on('error', function(e) {
            console.error("Got error: " + e.message);
        });
        
        // listener: do stuff when request ended
        res.on('end', function() {
          console.log('HTTP-STATUS: ' + res.statusCode);
          //console.info('BODY: ' + data);
          
            // parse received json data into native object
            dataObj = JSON.parse(data);
            
            // get timestamp
            result.timestamp = new Date(dataObj.status.created_at);
            console.log(result.timestamp);
            console.log(result.timestamp.getTime());
            
            
            // make a string from the status.text in this object
            doorString = JSON.stringify(dataObj.status.text);
            console.info("DOOR-STATUS: " + doorString);
            
            // 'grep' this string
           if (doorString.indexOf("OFFEN") !== -1) {
               result.door_open = true;
               result.door_status = space.get("_status_open");
               console.info("door_open: true");
           } else if (doorString.indexOf("GESCHLOSSEN") !== -1) {
               result.door_open = false;
               result.door_status = space.get("_status_closed");
               console.info("door_open: false");
           } else {
               result.door_open = null;
               console.error("door_open: null");
           }
           
           // Callback
           callback(result);
        
        });
    });

    // end the request
    request.end(); 
}

// export the 'get' method
exports.get = getDoorStatus;