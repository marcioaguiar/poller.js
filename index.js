var librato = require('librato-node');
var request = require('request')
var fs = require('fs');

if (!process.argv) {
	console.log('need config file argument');
	return;
}

var configPath = process.argv[2];

fs.readFile(configPath, 'utf-8', function(err, data) {
	if (err) {
		console.log('errr reading', configPath);
		console.log(err);
		process.exit(1);
	}

	var config = JSON.parse(data);
	initPollJob(config);
});

function initPollJob(config) {
	console.log('init job');
	console.log('config: ', config.email);
	

	librato.configure({email: config.email, token: config.token});
	librato.start();

	config.polls.forEach(function(poll) {

		executeTest(librato, poll); // first execution

		setInterval(function() {
			executeTest(librato, poll);
		}, poll.interval * 1000);
	});
	

	process.once('SIGINT', function() {
		console.log('stop librato');
	  librato.stop(); // stop optionally takes a callback
	});
};

function executeTest(librato, poll) {
	
	console.log('execute ', poll.key);
	
	var time = new Date().getTime();
	
	request(poll.url, function(error, response, body) {

		var end = new Date().getTime();
		time = end - time;
	  
 	  var code = 500;

 	  if (!error) {
 	  	code = response.statusCode;
 	  }

 	  librato.measure(poll.key, code);
 	  librato.measure(poll.key + '.time', time);
	});
}
