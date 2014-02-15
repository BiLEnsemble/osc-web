var osc = require('node-osc'),
    io = require('socket.io').listen(8081);

var oscClient;

io.sockets.on('connection', function (socket) {
	socket.on("config", function (obj) {
		oscClient = new osc.Client(obj.client.host, obj.client.port);

		oscClient.send('/status', socket.sessionId + ' connected');
		console.log("Connected: ", oscClient);
	});
	socket.on("message", function () {
        var arr = Array.prototype.slice.call(arguments, 0);

        //console.log(arr);

		if (typeof oscClient !== 'undefined') {
			//oscClient.send(addr, msg);
            oscClient.send.apply(oscClient, arr);
		}
		else
		{
			console.log("oscClient undefined! not sending: ", addr, msg);
		}
	});
});
