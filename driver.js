const elasticsearch = require('elasticsearch');
const { ElasticTrigger, ConsoleAlert, Match } = require('./trigger-alert-system');

const client = new elasticsearch.Client({
        host: '192.168.99.1:9200',
        log: 'error'
});

let match = new Match('EXISTS');
let maxalert = new ConsoleAlert("Found fuzzy searches with 'max'");

let maxTrigger = new ElasticTrigger(client, 'max~', match, { delay: 5 });
maxTrigger.addAlert(maxalert);

maxTrigger.start();
