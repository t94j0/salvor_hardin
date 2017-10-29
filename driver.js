const elasticsearch = require('elasticsearch');
const { ElasticTrigger, SayAlert, Match } = require('./trigger-alert-system');

const client = new elasticsearch.Client({
        host: '192.168.99.1:9200',
        log: 'error'
});

let match = new Match('COUNT', 5, { sign: '>' });
let maxalert = new SayAlert("Found > 5 fuzzy searches with 'max'");

let maxTrigger = new ElasticTrigger(client, 'max~', match, { delay: 5 });
maxTrigger.addAlert(maxalert);

maxTrigger.start();
