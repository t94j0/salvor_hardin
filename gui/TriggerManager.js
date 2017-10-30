const randomstring = require('randomstring');

let triggerMap;

class TriggerManager {
	constructor(client) {
		this.triggers = {};
	}

	addTrigger(trigger) {
		let id = randomstring.generate();
		if (!this.triggers[id]) {
			this.triggers[id] = trigger;
		}

		this.triggers[id].start((err) => {
			if (err) console.log(err);
		});
		
		return id;
	}

	removeTrigger(id) {
		delete this.triggers[id];
	}

	getTrigger(id) {
		return this.triggers[id];
	}
}

module.exports.getManager = () => {
	if (!triggerMap) {
		triggerMap = new TriggerManager();
	}

	return triggerMap;
};
