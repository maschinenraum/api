// import modules
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// Router: setup
// make object mapping paths to 'request.Handlers' functions
var handle = {}
handle["/"] = requestHandlers.start;
handle["/info"] = requestHandlers.info;
handle["/spaceapi.json"] = requestHandlers.info;

// start server
server.start(router.route, handle);