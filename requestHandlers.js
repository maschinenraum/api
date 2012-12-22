// modules
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

// public methods
// /start
function start(response) {
    console.log("Request handler 'start' was called.");
    
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
        
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

// /upload
function upload(response, request) {
    console.log("Request handler 'upload' was called")
    
    //handle form parsing for uploads
    // var 'form' holds content of incoming form
    var form = new formidable.IncomingForm();
    
    console.log("form: about to parse");
    
    //parse form
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        
        // rename the file to /tmp/test.png
        fs.rename(files.upload.path, "/tmp/test.png", function(err) {
            // if that failed,
            if (err) {
                // we have to remove it first
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
    })
    
    // build the response
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Image:<br>");
    response.write("<img src='/show' />");
    response.end();
}

// show png
function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    } )
}

// export public methods
exports.start = start;
exports.upload = upload;
exports.show = show;