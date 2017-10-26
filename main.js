const elasticsearch = require('elasticsearch');
const { ELKTrigger } = require('./trigger/ELKTrigger');
const { Match } = require('./matcher/Match');
const { SayAlert } = require('./alert/SayAlert');

const client = new elasticsearch.Client({
        host: '192.168.99.1:9200',
        log: 'error'
});


let match = new Match('COUNT', 5, { sign: '>' });
let maxalert = new SayAlert("Found > 5 fuzzy searches with 'max'");
let danalert = new SayAlert("ur fucking stupid");

let maxTrigger = new ELKTrigger(client, 'max~', match, { delay: 5 });
maxTrigger.addAlert(maxalert);
maxTrigger.addAlert(danalert);

maxTrigger.start();
