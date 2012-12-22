// require modules
// - use 'http' module (aka server)
var http = require("http");
// user 'url' module (get info about the request)
var url = require("url");

// declare function to run the server
function start() {
    // declare a function to answer requests to the server
    function onRequest (request, response) {
        // declare var holding the pathname
        var pathname = url.parse(request.url).pathname;

        console.log("Request for " + pathname + " received.");
        
        // build the response
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World from " + pathname);
        response.end();
    }
    // start the server on port 8888, define 'onRequest' as the callback function
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");    
}

// export our start function (map public method to internal implementation function)
exports.start = start;