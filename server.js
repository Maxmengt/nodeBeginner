// 请求（ require） Node.js 自带的 http 模块，并且把它赋值给 http 变量
var http = require("http");

function start() {
	http.createServer(function(request, response) {
		console.log("Request received.");
		response.writeHead(200, {"Content-Type" : "text/plain"});
		response.write("Hello World!");
		response.end();
	}).listen(8888);

	console.log("Server has started.");
}

exports.start = start;