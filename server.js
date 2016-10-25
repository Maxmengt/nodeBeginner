// 请求（ require） Node.js 自带的 http 模块，并且把它赋值给 http 变量
var http = require("http");
var url = require("url");

function start(route, handle) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(handle, pathname, response);
	}).listen(8888);

	console.log("Server has started.");
}

exports.start = start;