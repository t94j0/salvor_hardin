const Trigger = require(__dirname+'/Trigger');
const elasticsearch = require('elasticsearch');
const async = require('async');

/**
 * Elasticsearch specific trigger
 * @example
 * let newMatch = new Match('COUNT', 5, { sign: '>' });
 * let newAlert = new ConsoleAlert('New Alert!');
 * let newTrigger = new ElasticTrigger(client, 'max~', newMatch, {
 *  	delay: 5,
 *  	alerts: [newAlert]
 * });
 * newTrigger.start()
 *
 * @extends {Trigger}
 **/
class ElasticTrigger extends Trigger {
	/**
	 * @constructor
	 * @param {ElasticClient} client - Client for elasticsearch
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
	 * See [here]{@link https://www.npmjs.com/package/elasticsearch}
	 * @typedef {object} ElasticClient
	 */
	
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
				let hits = body.hits;
				// hits comes with { total: number, hits: {} }
				// Rename "total" to "size"
				hits.size = hits.total;
				delete hits.total;
				// Rename "hits" to "data"
				hits.data = hits.hits;
				delete hits.hits;

				return callback(null, hits);
			}, (err) => {
				return callback(err, null);
			});
        }
}

module.exports = ElasticTrigger;
