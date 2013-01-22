// import modules
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// Router: setup
// make object mapping paths to 'request.Handlers' functions
var handle = {};
handle[""] = requestHandlers.home;
handle["status"] = requestHandlers.spaceStatus;
handle["api"] = requestHandlers.spaceStatus;

// start server
server.start(router.route, handle);