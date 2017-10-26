const Alert = require('./Alert');

/**
 * Alert that prints to console
 * @extends Alert
 **/
class SayAlert extends Alert {
	/**
	 * @param {string} say - Thing to print to console
	 * @public
	 * @constructor
	 **/
	constructor(say) {
		super();
		this.say = say;
	}

	alert(hits, callback) {
		console.log(this.say);
		return callback(null);
	}
}

module.exports = SayAlert;
