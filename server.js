// 请求（ require） Node.js 自带的 http 模块，并且把它赋值给 http 变量
var http = require("http");
var url = require("url");

function start(route) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(pathname);

		response.writeHead(200, {"Content-Type" : "text/plain"});
		response.write("Hello World!");
		response.end();
	}).listen(8888);

	console.log("Server has started.");
}

exports.start = start;