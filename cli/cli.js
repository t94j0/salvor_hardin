const readline = require('readline');
const { ElasticTrigger, ConsoleAlert, Match } = require('../trigger-alert-system');
const { addClient } = require('./clients');

let clients = [];
let triggers = [];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', line => {
	commands = line.split(' ');
	switch (commands[0]) {
		case 'client':
			categoryClient(commands.slice(1));
			break;
		case 'trigger':
			categoryTrigger(commands.slice(1));
		default:
			console.log('Category is not correct');
	}
});

function categoryClient(commands) {
	switch(commands[0]) {
		case 'add':
			clients.push(addClient(commands[1]));
			console.log('Added client ' + commands[1]);
			break;
		case 'list':
			console.log(clients);
			break;
		default:
			console.log(commands[0] + ' is not a valid command');
	}
}

function categoryTrigger(commands) {
	switch(commands[0]) {
		case 'add':
			break;
		case 'list':
			break;
	}
}
