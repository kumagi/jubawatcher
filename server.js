var rpc = require('msgpack-rpcjs');

var client = rpc.createClient({
    port: 9199,
    host: "127.0.0.1"
});

client.request("get_loads", function(error, response){
    console.log(JSON.stringify(response) + "\n");
});

client.on("connect", function(){
    var http = require('http');
    http.createServer(function (req, res) {
	client.request("get_loads", function(error, response){
	    res.writeHead(200, {
		'Content-Type': 'text/plain',
		"Access-Control-Allow-Origin": "*"
	    });
	    res.end(JSON.stringify(response) + "\n");
	});
    }).listen(1337, '127.0.0.1');
});