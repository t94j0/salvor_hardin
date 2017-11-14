const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		title: 'Salvor Hardin'
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
	if (!mainWindow){
		createWindow();
	}
});
