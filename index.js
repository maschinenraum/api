// import modules
var server = require("./server");
var router = require("./router");

// start server
server.start(router.route);