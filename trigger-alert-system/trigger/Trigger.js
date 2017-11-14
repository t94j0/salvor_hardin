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
	 **/
	constructor(query, match, opts) {
		this.query = query;
		this.match= match;

		this.opts = this.opts || {};

		// Set defaults for optional parameters
		this.delay = opts.delay || 30;
		// setInterval uses milliseconds
		this.delay *= 1000;
		this.alerts = opts.alerts || [];

		// private data members
		this.intervalID = -1;

		// Value of "this" changes when inside async.waterfall binding
		// "this" from the constructor keeps value of this
		this.trigger = this.trigger.bind(this);
		this.getData = this.getData.bind(this);
		this.matcher = this.matcher.bind(this);
		this.callAlerts = this.callAlerts.bind(this);
		this.stop = this.stop.bind(this);
		this.start = this.start.bind(this);
	}

	/**
	 * Starts interval for running triggers
	 * @param {Trigger~errorCallback} callback - Callback for returning trigger errors
	 * @public
	 **/
	start(callback) {
		let id = setInterval(this.trigger, this.delay, (err) => {
			if (err) callback(err);
		});

		this.intervalID = id;
	}

	/**
	 * Stops interval only if start has been called
	 * @param {Trigger~errorCallback} callback - Callback for returning errors
	 * @public
	 **/
	stop(callback) {
		if (this.intervalID === -1) {
			return callback(new Error("Start has not been called yet."))
		} else {
			clearInterval(this.intervalID);
		}
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
	 * @todo Finish writing
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
	 * @param {Trigger~errorCallback} callback - Callback that is used by interval
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
	 * @param {object} hits - Hit object for count
	 * @param {number} hits.size - Size of hits
	 * @param {Array} hits.data - Data used for hits. This will vary for every implementation
	 * @param {Trigger~matcherCallback}
	 * @private
	 **/
        matcher(hits, callback) {
                this.match.isMatch(hits, (err, isMatch) => {
                        if (err) return callback(err, { isMatch:false });
                        else if (isMatch) return callback(null, { isMatch: true, hits: hits });
                        else return callback(null, { isMatch: false });
                });
        }
	/**
	 * @callback Trigger~matcherCallback
	 * @param {Error} err - Error
	 * @param {boolean} hits.isMatch - Checks if matcher is correct or not
	 * @param {object} hits.hits - Data returned by getData
	 * @private
	 **/

	/**
	 * Calls all alerts given by internal alert array
	 * @param {object} hits - Object used to wrap it
	 * @param {boolean} hits.isMatch - Used to check if matcher was successful
	 * @param {object} hits.hits - Data returned by getData
	 * @param {Trigger~callAlertsCallback} callback - callback
	 * @private
	 **/
        callAlerts(hits, callback) {
			// Return callback if it's not a match
			if (!hits.isMatch) return callback(null);

	// Push functions to array and bind "hits"
			let alertFuncs = [];
			for (let i in this.alerts) {
				alertFuncs.push(this.alerts[i].alert.bind(null, hits.hits));
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

module.exports = Trigger;
