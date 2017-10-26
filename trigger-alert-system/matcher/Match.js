const { VALUES, operations } = require('./matchLogic');

class Match {
	constructor(operation, value, opts) {
		if (!(operation.includes(VALUES))) {
			console.log(`Error: Operation ${operation} not found.`);
			return null;
		}
		this.operation = operation;
		this.value = value;
		this.opts = opts;
	}

	// Returns null if option is incorrectly formatted
	isMatch(data, callback) {
		let success = operations[this.operation](data, this.value, this.opts);
		if (success === null) {
			return callback("Incorrect option given", false);
		} else {
			return callback(null, success);
		}
	}
}

module.exports = Match;
