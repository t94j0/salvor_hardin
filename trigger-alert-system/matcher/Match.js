const { VALUES, operations } = require('./matchLogic');

class Match {
	constructor(operation, opts) {
		if (!(VALUES.includes(operation))) {
			console.log(`Error: Operation ${operation} not found.`);
			return null;
		}
		this.operation = operation;
		this.opts = opts;
	}

	// Returns null if option is incorrectly formatted
	isMatch(data, callback) {
		let success = operations[this.operation](data, this.opts);
		if (success === null) {
			return callback("Incorrect option given", false);
		} else {
			return callback(null, success);
		}
	}
}

module.exports = Match;
