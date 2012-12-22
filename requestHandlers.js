// modules
var exec = require("child_process").exec;

// public methods
// /start
function start(response) {
    console.log("Request handler 'start' was called.");
    
    // exec a "shell script", callback with output
    exec("pwd ; ls -lah", function (error, stdout, stderr) {
        //build the response
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    });
}

// /upload
function upload(response) {
    console.log("Request handler 'upload' was called")
    // build the response
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload");
    response.end();
}

// export public methods
exports.start = start;
exports.upload = upload;