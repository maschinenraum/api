// public methods
function start() {
    console.log("Request handler 'start' was called.");
}

function upload() {
    console.log("Request handler 'upload' was called")
}

// export public methods
exports.start = start;
exports.upload = upload;