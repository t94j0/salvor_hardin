const { BrowserWindow } = require('electron');

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
                width: 800,
                height: 600
        });

        mainWindow.on('close', () => {
                mainWindow = null;
        });
}

module.exports = () => {
	if (!mainWindow) {
		createWindow();
	}

	return mainWindow;
}
