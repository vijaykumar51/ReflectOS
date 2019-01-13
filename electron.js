const electron = require("electron");
const mainWindowConfig = require("./config/main-window");

const { app, BrowserWindow } = electron;
var mainWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow(mainWindowConfig);
	mainWindow.loadURL(`http://localhost:4200`);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

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
