// import modules
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// make object mapping paths to 'request.Handlers' functions
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

// start server
server.start(router.route, handle);