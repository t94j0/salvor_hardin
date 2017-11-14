const elasticsearch = require('elasticsearch');

function addClient(ip) {
	const newClient = new elasticsearch.Client({
		host: ip,
		log: 'error'
	});

	return newClient;
}

module.exports = { addClient };
