const { Trigger } = require('./Trigger');
const async = require('async');


/**
 * ELK specific trigger
 * @example
 * let newMatch = new Match('COUNT', 5, { sign: '>' });
 * let newAlert = new SayAlert('New Alert!');
 * let newTrigger = new ELKTrigger(client, 'max~', newMatch, {
 *  	delay: 5,
 *  	alerts: [newAlert]
 * });
 * newTrigger.start()
 *
 * @extends {Trigger}
 **/
class ELKTrigger extends Trigger {
	/**
	 * @constructor
	 * @param {ElkClient} client - Authenticated ELK client
	 * @param {string} client - ELK search query that will be used to match
	 * @param {Match} match - Match object that will do the matching
	 * @param {object} opts - Optional parameters that have defaults
	 * @param {number} opts.delay - Delay for interval to go off
	 * @param {Alert[]} opts.alerts - Array for initial alerts
	 * @public
	 **/
        constructor(client, query, match, opts) {
                super(query, match, opts);
                this.client = client;
        }
	
	/**
	 * Queries using Elasticsearch and returns hits
	 * @param {Trigger~getDataCallback} callback - Callback for waterfall
	 * @private
	 * @todo Make "body.hits.hits" more efficent when using a "COUNT" match by using "body.hits.count" that is already supplied instead of counting manually
	**/
        getData(callback) {
		this.client.search({
			q: this.query
		})
		.then((body) => {
			let hits = body.hits.hits;
			return callback(null, hits);
		}, (err) => {
			return callback(err, null);
		});
        }
}

module.exports.ELKTrigger = ELKTrigger;
