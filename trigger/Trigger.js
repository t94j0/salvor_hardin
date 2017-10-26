const async = require('async');

/**
 * Interface for triggers. Implements most functionality, but extending this
 * class is still needed for everything
 * @abstract
 **/
class Trigger {
	/** Constructor for Trigger
	 * @param {string} query - Query string to be used for getting data
	 * @param {Match} match - Match object for checking if query string matches trigger
	 * @param {object} opts - Contains optional data for objects
	 * @param {number} opts.delay - Delay (in seconds) for interval delay
	 * @param {Alert[]} opts.alerts - Default alerts to add with trigger
	 * @public
	 * @constructor
	 * @todo Find better way to check for opts besides if statement
	 **/
	constructor(query, match, opts) {
		this.query = query;
		this.match= match;

		if (!opts) {
			var opts = {};
		}

		// Set defaults for optional parameters
		this.delay = opts.delay || 30;
		// setInterval uses milliseconds
		this.delay *= 1000;
		this.alerts = opts.alerts || [];

		// Value of "this" changes when inside async.waterfall binding
                // "this" from the constructor keeps value of this
                this.trigger = this.trigger.bind(this);
                this.getData = this.getData.bind(this);
                this.matcher = this.matcher.bind(this);
                this.callAlerts = this.callAlerts.bind(this);
	}


	/**
	 * Starts interval for running triggers
	 * @public
	 **/
	start() {
		let id = setInterval(this.trigger, this.delay, (err) => {
			if (err) {
				console.log("Error: ", err);
				// Clear the interval if the error is serious
				// clearInterval(id);
			}

		});
	}

	/**
	 * Adds new alerts to internal alert array
	 * @param {Alert} newAlert - New alert object to be called by trigger
	 * @public
	 **/
	addAlert(newAlert) {
		this.alerts.push(newAlert);
	}

	/**
	 * Converts trigger into JSON so that it can be exported
	 * @returns {object} JSON representation of trigger
	 * @public
	 **/
	save() {
		let alerts = [];
		for (let alert in this.alerts) {
			alerts.push(alert);
		}
		return { query: this.query, duration: duration, alerts: alerts }
	}

	// private
	
	/**
	 * Individual trigger that is called every interval
	 * @param {Trigger~triggerCallback} callback - Callback that is used by interval
	 * @access private
	 **/
	trigger(callback) {
		async.waterfall([
                        this.getData,
                        this.matcher,
                        this.callAlerts
                ], (err) => {
                        if (err) return callback(err);
                        else return callback(null);
                });
	}
	/**
	 * @callback Trigger~triggerCallback
	 * @param {Error} err - Error if something happens in trigger
	 * @private
	 **/

	/**
	 * Get data for specific implemention
	 * @access private
	 * @abstract
	 * @param {Trigger~getDataCallback} callback - Callback used by waterfall
	 **/
	getData(callback) { }
	/**
	 * @callback Trigger~getDataCallback
	 * @param {Error} err - Error if something happens in getData which is returned to waterfall
	 * @param {Array} hits - Return hits given by data
	 * @private
	 **/

	/**
	 * Uses Match objects to check for successful matches
	 * @param {Array} hits - Array of hits for data returned by "getData"
	 * @param {Trigger~matcherCallback}
	 * @private
	 * @todo Pass successful matches the hits that made them successful
	 **/
        matcher(hits, callback) {
                this.match.isMatch(hits, (err, isMatch) => {
                        if (err) return callback(err, false);
                        else if (isMatch) return callback(null, true);
                        else return callback(null, false);
                });
        }
	/**
	 * @callback Trigger~matcherCallback
	 * @param {Error} err - Error
	 * @param {boolean} isMatch - Checks if matcher is correct or not
	 * @private
	 **/

	/**
	 * Calls all alerts given by internal alert array
	 * @param {boolean} isMatch - Used to check if matcher was successful
	 * @param {Trigger~callAlertsCallback} callback - callback
	 * @private
	 **/
        callAlerts(isMatch, callback) {
                // Return callback if it's not a match
                if (!isMatch) return callback(null);

                let alertFuncs = [];
                for (let i in this.alerts) {
                        alertFuncs.push(this.alerts[i].alert);
                }

                // Execute callbacks if it is a match
                async.parallel(alertFuncs, (err) => {
                        if (err) return callback(err);
                        else return callback(null);
                });
        }
	/**
	 * @callback Trigger~callAlertsCallback
	 * @param {Error} err - Error
	 * @private
	 **/
}

module.exports.Trigger = Trigger;
