// 'route' function, 
// with parameters:
// - 'handle' object
// - 'pathname' function
// - 'response' object
function route(handle, pathname, response) {
    console.log("Routing request for " + pathname);
    
    // check if we get a function for the received pathname from the handle object
    if (typeof handle[pathname] === 'function') {
        console.log("request handler found for " + pathname);
        
        // 'handle' the pathname (call the corresponding function we got back from the object)
        // this will always call one of the requestHandlers
        return handle[pathname](response);
        
    } else {
        // if the 'handle' object has no function mapped to our pathname, it is an 404 error
        // in this case, we build the response right here
        console.log("NO request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.writeHead("404 Not found");
        response.end();
    }
}

// export the 'route' method
exports.route = route;