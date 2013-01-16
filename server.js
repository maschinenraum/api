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
        
        route(handle, pathname, response, request);
    }
    
    // start the server, define 'onRequest' as the callback function
    // - if we got a port from enivronment (ie. heroku, or foreman), use it, otherwise use 8888
    var port = process.env.PORT || 9999;
    http.createServer(onRequest).listen(port);
    console.log("Server has started on port " + port + ".");    
}

// export our start function (map public method to internal implementation function)
exports.start = start;