const Page = require('./Page');
const Indices = require('./Indices');
const elasticsearch = require('elasticsearch');
const { ipcMain } = require('electron');

class Welcome extends Page {
	constructor() {
		super('welcome.html');

		ipcMain.on('submitWelcomeTypeIP', this.submitTypeIP);

		this.submitTypeIP = this.submitTypeIP.bind(this);
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

				let indices = new Indices();
			}
		})
	}
}

module.exports = Welcome;
