let windowSingleton = require('../WindowSingleton');
const path = require('path');
const url = require('url');

class Page {
	constructor(htmlFile) {
		// Get the Main Window object
		this.window = windowSingleton();
		
		// Get URL for requested view
		let htmlURL = url.format({
			pathname: path.join(__dirname, '..', 'views', htmlFile),
			protocol: 'file:',
			slashes: true
		});

		// Load URL into the window
		this.window.loadURL(htmlURL);
	}
}

module.exports = Page;
