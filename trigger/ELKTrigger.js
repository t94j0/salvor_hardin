const { Trigger } = require('./Trigger');
const async = require('async');


/**
 * @implements {Trigger}
 **/
class ELKTrigger extends Trigger {
	/**
	 * @constructor
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
