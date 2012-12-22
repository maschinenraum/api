// require modules
// - use 'http' module (aka server)
var http = require("http");
// user 'url' module (get info about the request)
var url = require("url");

// declare function to run the server
// - parameter: 'route' - function from router module
//   - parameter: the 'handle' object (from index)
function start(route, handle) {
    // declare a function to answer requests to the server
    function onRequest (request, response) {
        // declare var holding the pathname
        var pathname = url.parse(request.url).pathname;

        console.log("Request for " + pathname + " received.");
        
        // call the route function from router module,
        // with parameters: handle object, pathname, response
        // (this will handle the actual request)
        route(handle, pathname, response);
        
    }
    // start the server on port 8888, define 'onRequest' as the callback function
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");    
}

// export our start function (map public method to internal implementation function)
exports.start = start;