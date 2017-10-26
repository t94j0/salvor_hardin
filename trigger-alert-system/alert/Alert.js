/**
 * Alert metaclass
 * @abstract
 **/
class Alert {
	/**
	 * @constructor
	 **/
	constructor() {
		this.alert = this.alert.bind(this);
	}

	alert(hits, callback) {
		return callback(null);
	}
	/**
	 * @callback Alert-callback
	 * @param {Error} err - Used to send errors to interval
	 **/
}

module.exports = Alert;
