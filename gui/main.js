const { app, BrowserWindow } = require('electron');
const windowSingleton = require('./WindowSingleton');
const Welcome = require('./controllers/Welcome');
const url = require('url');
const path = require('path');

let mainWindow

function createWindow() {
	//new Welcome();
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views', 'build', 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('close', () => {
		mainWindow = null;
	});
}

// Application related things
app.on('ready', createWindow);

app.on('window-all-closed', () => {
	// Only quit on macOS when Cmd-Q is pressed
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (!windowSingleton.getWindow()) {
		createWindow()
	}

});
