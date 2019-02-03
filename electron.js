const electron = require("electron");
const mainWindowConfig = require("./config/main-window");

const { app, BrowserWindow, ipcMain } = electron;
var mainWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow(mainWindowConfig);
	mainWindow.loadURL(`http://localhost:9090`);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

// Event handler for asynchronous incoming messages
ipcMain.on("asynchronous-message", (event, arg) => {
	console.log(arg);

	// Event emitter for sending asynchronous messages
	event.sender.send("asynchronous-reply", "async pong");
});

// Event handler for synchronous incoming messages
ipcMain.on("synchronous-message", (event, arg) => {
	console.log(arg);

	// Synchronous event emmision
	event.returnValue = "sync pong";
});

app.on("ready", createMainWindow);
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow == null) {
		createMainWindow();
	}
});
