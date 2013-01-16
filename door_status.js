var https = require('https');

// get live door status
// TODO: move to own backend before API v1 is shut down

function getDoorStatus(callback) {
    console.log("Door status need to be determined.");
    
    // HTTPS request
    var options = {
    	host : 'api.twitter.com',
    	port : 443,
    	path : '/1/users/show.json?screen_name=mr_door_status',
    };
    console.log("GET latest door tweets from " + options.host);

    // declare var to pass around the received data
    var data = "";
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
        	console.info('HTTP-STATUS: ' + res.statusCode);
	    console.info('BODY: ' + data);

            // parse received json data into native object
            var dataObj = JSON.parse(data);
        
            // prepare result object
            var result = {};
            
            // get timestamp
            var timestamp = new Date(dataObj.status.created_at);
            console.log(timestamp);
            console.log(timestamp.getTime);
            
            // make a string from the status.text in this object
            var doorString = JSON.stringify(dataObj.status.text)
            console.info('DOOR-STATUS: ' + doorString);
        
            // 'grep' this string
           if (doorString.indexOf("OFFEN") != -1) {
               result.door_open = true;
               console.info("door_open: true");
           } else if (doorString.indexOf("GESCHLOSSEN") != -1) {
               result.door_open = false;
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