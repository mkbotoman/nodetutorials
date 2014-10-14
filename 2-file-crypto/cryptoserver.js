// require modules
var http = require("http");
var fs = require("fs");
var url = require("url");
var sjcl = require("./sjcl.js");


// create http server
http.createServer(function(request, response) {

	var parsedUrl = url.parse(request.url, true);

	// use switch as a (primitive) http router
	switch (parsedUrl.pathname) {

		// display cryptoform.html as default/index page
		case "/":
		case "/index":
		case "/index.html":
		
			var fileName = "./cryptoform.html";
			response.writeHead(200, "OK", {
				"content-type": "text/html"
			});
			fs.readFile(fileName, "utf8", function(err, file) {
				response.write(file);
				response.end();
			});
			break;

		case "/getEncryptedFile" :
			var fileName = parsedUrl.query.fileName;
			var password = "password";
			var encryptedData, output;
			response.writeHead("200", "OK", {
				"content-type": "text/html"
			});
			fs.readFile(fileName,"utf8", function(err,file){
				if (file) {
					encryptedData = sjcl.encrypt(password,file);
					console.log(encryptedData);
					output = encryptedData;
				} else {
					console.log(err);
					output = JSON.stringify({
						"ct" : "File Not Found"
					});
				}
				response.write(output);
				response.end();
			});

			break;

		default:

			// prepend the path as needed to retrieve relative to local folder
			var fileName = "." + parsedUrl.pathname;

			// determine whether request file is JavaScript, else treat as HTML
			if (fileName.indexOf(".js") > 0) {
				response.writeHead(200, "OK", {
					"content-type": "text/javascript"
				});
			} else {
				response.writeHead(200, "OK", {
					"content-type": "text/html"
				});
			}
			// if file is available,
			fs.readFile(fileName, "utf8", function(err, file) {
				if (file) response.write(file);
				response.end();
			});
			break;



	}

}).listen(9999);