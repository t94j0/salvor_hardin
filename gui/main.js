const { app } = require('electron');
const windowSingleton = require('./WindowSingleton');
const Welcome = require('./pages/Welcome');

function createWindow() {
	new Welcome();
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
