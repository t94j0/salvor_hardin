const Page = require('./Page');
const triggerManager = require('../TriggerManager');
const { Match, ElasticTrigger, ConsoleAlert } = require('../../trigger-alert-system');
const { ipcMain } = require('electron');

class Dashboard extends Page {
	constructor(client) {
		super('dashboard.html');
		this.client = client;
		this.triggerManager = triggerManager.getManager();

		this.createAlert = this.createAlert.bind(this);
		this.createTrigger = this.createTrigger.bind(this);

		ipcMain.on('submitDashboardCreateAlert', this.createAlert);
		ipcMain.on('submitDashboardCreateTrigger', this.createTrigger);
	}


	triggerstatus() {
		this.triggerManager.triggerStatus();
	}

	createAlert(event, args) {
		let alert

		switch (args.alertType) {
			case "console":
				alert = new ConsoleAlert(args.alertInput);
				break
			case "slack":
				alert = null;
				break
		}

		if (!alert) {
			event.sender.send('createAlertReply', 'failed');
			return
		}

		let triggerID = args.triggerID;
		let trigger = this.triggerManager.getTrigger(triggerID);
		trigger.addAlert(alert);

		event.sender.send('createAlertReply', 'success');
	}

	createTrigger(event, args) {
		let match = new Match(args.match, {
			value: args.matchNumber,
			sign: args.matchSign
		});

		let trigger = new ElasticTrigger(this.client, args.query, match, {
			delay: args.delay
		});

		trigger.start();

		let id = this.triggerManager.addTrigger(trigger);
		
		event.sender.send('createTriggerReply', id);
	}

	removeTrigger(event, args) {
		let id = args.id;
		this.triggerManager.removeTrigger(id);
	}
}

module.exports = Dashboard;
