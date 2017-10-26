const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let globalWindow

function createWindow() {
	globalWindow = new BrowserWindow({ width: 800, height: 600 });
	globalWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	globalWindow.on('close', () => {
		globalWindow = null;
	});
}


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
	if (win === null) {
		createWindow()
	}
})
