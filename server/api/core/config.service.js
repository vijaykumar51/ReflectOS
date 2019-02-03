const path = require("path");
const fs = require("fs");
const glob = require("glob");

const WIDGET_DIR = path.resolve(__dirname, "../widgets");
const WIDGET_CONFIG = "widget-config.json";

exports.getConfig = async () => {
	let response = {};
	response["widgets"] = {};

	// read widget parent config
	let widgetGlobalConfig = fs.readFileSync(
		path.resolve(WIDGET_DIR, WIDGET_CONFIG),
		"utf-8"
	);

	// read individual widget config file
	let configFiles = glob.sync("**/config.json", { cwd: WIDGET_DIR });
	configFiles.forEach(file => {
		let widgetConfig = JSON.parse(
			fs.readFileSync(path.resolve(WIDGET_DIR, file), "utf-8")
		);
		response["widgets"][widgetConfig.widgetName] = widgetConfig;
	});

	response["widgetsParentConfg"] = JSON.parse(widgetGlobalConfig);
	response["files"] = configFiles;
	return response;
};

getWidgetConfig = () => {};
