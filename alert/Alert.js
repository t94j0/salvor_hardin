class Alert {
	constructor() {
		this.alert = this.alert.bind(this);
	}

	alert(callback) {
		return callback(null);
	}
}

module.exports.Alert = Alert;
