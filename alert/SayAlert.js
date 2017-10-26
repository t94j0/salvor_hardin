const { Alert } = require('./Alert');

class SayAlert extends Alert {
	constructor(say) {
		super();
		this.say = say;
	}

	alert(callback) {
		console.log(this.say);
		return callback(null);
	}
}

module.exports.SayAlert = SayAlert;
