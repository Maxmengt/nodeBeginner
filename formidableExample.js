var formidable = require("formidable"),
	http = require("http"),
	sys = require("sys");

http.createServer(function(request, response) {
	if( request.url == "/upload" && request.method.toLowerCase() == "post" ) {
		// parse a file upload
		var form = new formidable.IncomingForm();
		form.parse(request, function(error, fields, files) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("received upload:\n\n");
			response.end(sys.inspect({fields: fields, files: files}));
		});
		console.log("parse a file upload");
		return ;
	}

	// show a file upload form
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(
		"<form action='/upload' enctype='multipart/form-data' " + 
		"method='post'>" + 
		"<input type='text' name='title'><br/>" + 
		"<input type='file' name='upload' multiple='multiple'><br/>" + 
		"<input type='submit' value='Upload'>" + 
		"</form>"
	);
	console.log("show a file upload form");
}).listen(8888);