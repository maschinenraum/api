// 'route' function, 
// with parameters:
// - 'handle' object
// - 'pathname' function
function route(handle, pathname) {
    console.log("Routing request for " + pathname);
    
    // check if we get a function for the received pathname from the handle object
    if (typeof handle[pathname] === 'function') {
        console.log("request handler found for " + pathname);
        // 'handle' the pathname (call the corresponding function we got back from the object)
        handle[pathname]();
    } else {
        console.log("NO request handler found for " + pathname);
    }
}

// export the 'route' method
exports.route = route;