var net = require("net");
var server = net.createServer();

var clients = [];

server.on("connection", function(client){
	client.write("Hello There!\n");
	//client.end();
	client.chatName = client.remoteAddress + "-" + client.remotePort;
	
	client.on("data", function(data) {
		for (var i = 0; i < clients.length; i++){
			if (client != clients[i]){
				clients[i].write(client.chatName + ": " + data);
			}
		}
	});

	client.on("end", function() {
		clients.splice(clients.indexOf(client),1);
		console.log(client.chatName + " has left the building");
	});

	client.on("error", function(error){
		console.log(error);
	});

	clients.push(client);
});

server.listen(9999);