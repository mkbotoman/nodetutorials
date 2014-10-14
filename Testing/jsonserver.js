// import modules
var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

// set globals
var chatClients = [];

// chat client objects have a name and a response object
// get a chat client object, or add one if new
function getChatClient(name, response) {
	var selectedClient = null;
	// check whether client already exists
	for (var client in chatClients) {
		if(chatClients[client].name == name) {
			selectedClient = chatClients[item];
		}
	}
	// create and store new client object if one doesn't exist
	if (selectedClient == null) {
		var newClient = {"name":name, "response":response};
		chatClients.push(newClient);
		selectedClient = newClient;
	}
	return selectedClient;
}

// create http server
http.createServer(function(request, response) {

	var parsedUrl = url.parse(request.url, true);
	// console.log("--parsed URL--");
	// console.log(parsedUrl);

	switch(parsedUrl.pathname) {
		case "/": 
		case "/index":
		case "/index.html": {
			// console.log(request.method + ":" + request.url);
			var page = "./chatform.html";
			response.writeHead(200, "OK", {"content-type":"text/html"});
			fs.readFile(page, "utf8", function(err, data) {
				response.write(data);
				response.end();
			});
			break;
		}
		case "/js/script.js": {
			// console.log(request.method + ":" + request.url);
			var page = "./js/script.js";
			response.writeHead(200, "OK", {"content-type":"text/javascript"});
			fs.readFile(page, "utf8", function(err, data) {
				response.write(data);
				response.end();
			});
			break;				
		}
		case "/listen": {
			// console.log("--listening to--");
			// console.log(parsedUrl.query.name);

			// retrieve this user's chat client object, and create if new
			var client = getChatClient(parsedUrl.query.name, response);

			// return response to client iframe but DO NOT END
			client.response.writeHead(200, { "content-type":"text/html;charset=utf-8", "transfer-encoding":"chunked"} );
			break;
		}
		case "/publish": {
			// console.log(request.method + ":" + request.url);
			var completePost = "";

			// assemble full request (may be mutiple chunks if large)
			request.on("data", function(chunk){
				// console.log("--chunk data--");
				// console.log(chunk.toString());
				completePost += chunk.toString();
			});

			request.on("end", function(){
				// console.log("--completePost end--");
				// console.log(completePost);
				parsedPost = querystring.parse(completePost);
				// console.log("---parsedPost end--");
				// console.log(parsedPost);

				var name = parsedPost.name;
				var message = parsedPost.message;
				for (var client in chatClients) {
					var response = chatClients[client].response;
					response.write("<script type='text/javascript'>parent.addChat('" + name + "','" + message + "');</script>");
				}

				// response.writeHead(200, "OK", {"content-type":"text/html"});
				// response.write("success");
				// response.end();
			});

			// response.writeHead(200, "OK", {"content-type":"text/html"});
			// response.write("<h1>Publish</h3>");
			// response.end();

			break;
		}
		default: {
			// console.log(request.method + ":" + request.url);
			response.writeHead(404, "File Not Found", {"content-type":"text/html"});
			response.end();		
		}
	}

}).listen(9999);