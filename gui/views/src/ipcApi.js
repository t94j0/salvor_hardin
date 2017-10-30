const { ipcRenderer } = require('electron');

/**
 * @param {object} args - Arguments to connect
 * @param {string} args.type - Either "elasticsearch" or "splunk"
 * @param {string} args.ip - IP and port of log aggregator
 **/
function submitConnect(args) {
	ipcRenderer.send('sendConnectTypeIP', args);
}

module.exports.submitConnect = submitConnect;
