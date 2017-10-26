const Alert = require('./Alert');
const IncomingWebhook = require('@slack/client').IncomingWebhook;

/**
 * Send alerts to Slack
 * This class is meant to be very easy to extend if you want to write custom messages. `writeToSlack` is very useful for people trying to extend this class.
 * @extends Alert
 **/
class SlackAlert extends Alert {
	/**
	 * @param {string} webhook - Webhook address given by [slack webhook]{@link https://api.slack.com/incoming-webhooks}
	 * @param {string} say - What to say when alert triggers
	 * @constructor
	 **/
	constructor(webhook, say) {
		this.webhook = webhook;
		this.say = say || '';
	}

	/**
	 * @param {Hit[]} hits - Data from Trigger's query
	 * @param {Alert~callback} callback
	 * @public
	 **/
	alert(hits, callback) {
		writeToSlack(this.say, callback);
	}

	/**
	 * Used to write to slack given text. Should not be overridden by extended classes
	 * @param {string} text - Text to put into 
	 * @param {Alert~callback} callback
	 * @access package
	 **/
	writeToSlack(text, callback) {
		let webhook = new IncomingWebhook(this.webhook);
		webhook.send(text, (err, header, statusCode, body) => {
			if (err) return callback(err);
			else return callback(null)
		});
	}
}

module.exports = SlackAlert;
