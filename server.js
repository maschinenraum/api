// use 'http' module (aka server)
var http = require("http");

// declare function to run the server
function start() {
    // declare a function to answer requests to the server
    function onRequest (request, response) {
        console.log("Request received.")
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }
    // start the server on port 8888, define 'onRequest' as the callback function
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");    
}

// export our start function (map public method to internal implementation function)
exports.start = start;