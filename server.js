// 请求（ require） Node.js 自带的 http 模块，并且把它赋值给 http 变量
var http = require("http"),
	url = require("url");

function start(route, handle) {
	http.createServer(function(request, response) {
		// var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		// request.setEncoding("utf8");

		route(handle, pathname, response, request);

		// // Had the request receive yet ?
		// request.addListener("data", function(postDataChunk) {
		// 	postData += postDataChunk;
		// 	console.log("Received POST data chunk '" + 
		// 		postDataChunk + "'.");
		// });

		// request.addListener("end", function() {
		// 	route(handle, pathname, response, postData);
		// });
	}).listen(8888);

	console.log("Server has started.");
}

exports.start = start;