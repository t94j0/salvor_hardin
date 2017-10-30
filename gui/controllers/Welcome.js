const { ipcMain } = require('electron');
const Page = require('./Page');

const Dashboard = require('./Dashboard');
const elasticsearch = require('elasticsearch');

class Welcome extends Page {
	constructor() {
		super('welcome.html');

		ipcMain.on('submitWelcomeTypeIP', this.submitTypeIP);
	}

	submitTypeIP(event, arg) {
		let client = elasticsearch.Client({
			host: arg.ip,
			log: 'error'
		})

		client.ping({
			requestTimeout: 2000
		}, (err) => {
			if (err) {
				event.sender.send('replyWelcomeTypeIP', 'failed ping');
			} else {
				new Dashboard(client);
			}
		})
	}
}

module.exports = Welcome;
