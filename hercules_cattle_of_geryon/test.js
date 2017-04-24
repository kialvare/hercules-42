var http = require('http');
var bl = require('bl');
if (process.argv.length == 2)
	return console.log("Usage: node siege.js [-r reps] [-c users] [-d delay] [http:// url]")

var concurrentRequests = 0
var requestsInProgress = 0
var totalRequestsToMake = 0
var totalRequestsSoFar = 0
var totalRequestsCompleted = 0
var maxDelay = 300

var totalDuration = 0
var totalSize = 0
var successCount = 0
var failCount = 0

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
	console.log("Sending " +  totalRequestsToMake + " requests with " +  concurrentRequests +
	" concurrent user and a maximum delay of " +  maxDelay)
} else {
	console.log("Sending " + totalRequestsToMake + " requests with " + concurrentRequests +
	" concurrent users and a maximum delay of " + maxDelay)
}


function request(number) {
	requestsInProgress += 1
	var startTime = Date.now()
	var url = process.argv[5]
	if (url == undefined)
		return console.log("Missing url")

	console.log('> Request', number, 'started')

	http.get(url, function (response) {
		response.pipe(bl(function(err, data) {
			requestsInProgress -= 1
			totalRequestsCompleted += 1
			totalDuration += Date.now() - startTime
			var contentLength = response.headers['content-length']
			totalSize += parseInt(contentLength)

			if (response.statusCode == 200) {
				successCount += 1
			} else
				failCount += 1

			console.log('Request', number, 'done')

			start()
		}))
	})
}

process.on('uncaughtException', function (err) {
	console.log(err);
});

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
		benchmark()
	}
}

var lineLength = 40

function printLine(title, value, units = '') {
	title = title.toString()
	value = value.toString()

	var paddingLength = lineLength - title.length - value.length

	console.log(title + ' '.repeat(paddingLength) + value + ' ' + units)
}

function benchmark() {
	printLine('Transactions', totalRequestsCompleted, 'hits')
	printLine('Elapsed time', (totalDuration/1000).toFixed(2), 'secs')
	printLine('Concurrency', (totalRequestsCompleted/totalDuration).toFixed(2))
	printLine('Successful transactions', failCount)
	// printLine('Availability' (successCount/totalRequestsToMake*100).toFixed(2), '%')
	// printLine('Data transferred', (totalSize/(1024*1024)).toFixed(2), 'MB')
	// console.log(totalSize/(1024*1024))
	// printLine('Transaction rate', '0', 'MB/sec')
	// printLine('Longest transaction', '0')
	// printLine('Shortes transaction', '0')
}

start()
