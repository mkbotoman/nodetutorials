var http = require("http");
var fs = require("fs");

function start() {

	function requestHandler(request, response){
		console.log("request received");
		/*
		response.writeHead(200, {"content-type" : "text/html"});
		response.write("Hello World");
		*/
		var path = "." + request.url;
		if (path == "./")
			path = "./index.html"; //sets default file on load

		fs.readFile(path, function(err,data){
			if (data){
				response.writeHead(200, {
					"content-type" : "text/html"
				});
				response.write(data.toString("utf8"));
				response.end();
			} else{
				response.writeHead(404);
				response.end();
			}
		});
	}
	var server = http.createServer(requestHandler);
	server.listen(9999);
}

exports.start = start;