class Alert {
	constructor() {
		this.alert = this.alert.bind(this);
	}

	alert(hits, callback) {
		return callback(null);
	}
}

module.exports = Alert;
