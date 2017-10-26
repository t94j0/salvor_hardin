const { Trigger } = require('./Trigger');

// TODO
class SplunkTrigger extends Trigger {
        constructor(client, query, duration, alerts) {
                super(query, duration, alerts);
                this.client = client;
        }

        trigger(callback) {
                this.client.jobs().create(this.query, (err, job) => {
                        if (err) callback(null, err);
                        else {
                                callback(job, null)
                        }
                });
        }
}

module.exports.SplunkTrigger = SplunkTrigger;
