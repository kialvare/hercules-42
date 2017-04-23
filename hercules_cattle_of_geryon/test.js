var http = require('http');
var request = require('request');
var bl = require('bl');

var concurrentRequests = process.argv[3]
var requestsInProgress = 0
var requestsSoFar = 0
var totalRequests = 100
var totalRequestsSoFar = 
var maxDelay = 300

for (var i = 2; i < process.argv.length; i++) {
	var arg = process.argv[i]

	var concurrent = arg.match(/-c(\d+)/)
	var reps = arg.match(/-r(\d+)/)
	var delay = arg.match(/-d(\d+)/)

	if (concurrent) {
		concurrentRequests = parseInt(concurrent[1])
	}

	if (reps) {
		totalRequestsToMake = parseInt(reps[1])
	}

	if (delay) {
		maxDelay = parseInt(delay[1])
	}
}

if (concurrentRequests == 1) {
	console.log('Will send', totalRequestsToMake, 'requests with', concurrentRequests,
	'concurrent user and a maximum delay of', maxDelay)
} else {
	console.log('Will send', totalRequestsToMake, 'requests with', concurrentRequests,
	'concurrent users and a maximum delay of', maxDelay)
}


function makeRequest() {
	requestsSoFar += 1
	requestsInProgress += 1

	var randomDelay = Math.random() * maxDelay
	var startTime = Date.now()

	http.get(process.argv[4], function (response) {
		response.pipe(bl(function(err, data) {
			requestsInProgress -= 1
				if (err)
					return console.error(err);
		}))
	})
}

function start() {
	if (requestsInProgress >= concurrentRequests) {
		return
	}

	if (totalRequestsSoFar < totalRequestsToMake) {
		totalRequestsSoFar += 1

		request(totalRequestsSoFar)

		start()
	} else if (totalRequestsCompleted >= totalRequestsToMake) {
		console.log('Done!')
		//benchmarks()
	}
}

start()

//function benchmarks() {
	//console.log("The server is now under siege...");
	//console.log("Lifting the server siege...");
	//console.log("Transactions: " + i); // How many times it ran
	//console.log("Availability: "); // How available the server is
	//console.log("Elapsed time: "); // How much time it took
	//console.log("Data transferred: "); //done me thinks
	//console.log("Response time: ");
	//console.log("Transaction rate: ");
	//console.log("Throughput: ");
	//console.log("Concurrency: ");
	//console.log("Successful Transactions: ");
	//console.log("Failed Transactions: ");
	//console.log("Longest Transactions: ");
	//console.log("Shortest Transactions: ");
//}

//process.on('SIGINT', function() {
//    console.log("Caught interrupt signal");

//	    if (i_should_exit)
//		        process.exit();
//});
