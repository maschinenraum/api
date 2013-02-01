// 'route' function, 
// with parameters:
// - 'handle' object
// - 'pathname' function
// - 'response' object
function route(handle, parameters, response, request) {
  console.log("Routing request for " + parameters.resource);
    
  // check if we get a function for the received pathname from the handle object
  if (typeof handle[parameters.resource] === 'function') {
      console.log("request handler found for resource: " + parameters.resource);
        
      // 'handle' the pathname (call the corresponding function we got back from the object)
      // this will always call one of the requestHandlers
      return handle[parameters.resource](response, request, parameters);
  } else {
      // if the 'handle' object has no function mapped to our pathname,  it is a 404 error.
      // in this case, we build the response right here
      console.log("NO request handler found for " + parameters.resource);
      //console.info(request);
        
      response.writeHead(404, {"Content-Type": "text/plain"});
      var msg = "404 Not found";
      response.writeHead(msg);
      response.write(msg + "\n\nNo resource found for " + parameters.resource);
      response.end();
  }
}

// export the 'route' method
exports.route = route;