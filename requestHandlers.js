// var exec = require("child_process").exec;
var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function start(response, request) {
	console.log("Request handler 'start' was called.");

	// Try to use react.js
	// Maybe need to use fs to read .html file and send back to browser
	var body = '<html>' + 
		'<head>' + 
		'<meta http-equiv="Content-Type" content="text/html; ' + 
		'charset=UTF-8" />' + 
		'</head>' + 
		'<body>' + 
		// Q: What's the meaning of enctype='multipart/form-data' ?
		'<form action="/upload" enctype="multipart/form-data" method="post">' + 
		'<input type="file" name="upload" />' + 
		'<input type="submit" value="Upload file" />' +
		// '<form action="/upload" method="post">' + 
		// '<textarea name="text" row="20" col="60"></textarea>' + 
		// '<input type="submit" value="Submit text" />' + 
		'</form>' + 
		'</body>' + 
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

	// exec("ls -lah", 
	// exec("find /", { timeout: 10000, maxBuffer: 20000*1024 },
	// 	function(error, stdout, stderr) {
	// 		response.writeHead(200, {"Content-Type": "text/plain"});
	// 		response.write(stdout);
	// 		response.end();
	// 	}
	// );
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	form.uploadDir = "image";

	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		
		try {
			fs.renameSync(files.upload.path, "image/test.png");
		}
		catch( err ) {
			console.log(err);
		}
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");

		// Why cannot ./image/test.png and why "/show" works
		response.write("<img src='/show' />");
		response.end();
	});
	// response.writeHead(200, {"Content-Type": "text/plain"});
	// response.write("Hello Upload!\n");
	// response.write("You've sent: " + 
	// 	// What is querystring ?
	// 	// The querystring module provides utilities for parsing and formatting URL query strings.
	// 	querystring.parse(postData).text);
	// console.log(typeof querystring.parse(postData), querystring.parse(postData));
	// response.end();
}

function show(response, request) {
	console.log("Request handler 'show' was called.");
	fs.readFile("./image/test.png", "binary", function(error, file) {
		if( error ) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		}
		else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;