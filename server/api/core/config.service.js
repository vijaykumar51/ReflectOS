const path = require("path");
const fs = require("fs");
const glob = require("glob");

const WIDGET_DIR = path.resolve(__dirname, "../widgets");
const WIDGET_CONFIG = "widget-config.json";

let configJson;

exports.getConfig = async () => {
	return getConfigJson();
};

function getConfigJson() {
	if (configJson) {
		return configJson;
	}
	let response = {};
	response["widgets"] = {};
	response["tabInfo"] = {};

	// read widget parent config
	let widgetGlobalConfig = fs.readFileSync(path.resolve(WIDGET_DIR, WIDGET_CONFIG), "utf-8");

	// read individual widget config file
	let configFiles = glob.sync("**/config.json", { cwd: WIDGET_DIR });
	configFiles.forEach((file) => {
		let widgetConfig = JSON.parse(fs.readFileSync(path.resolve(WIDGET_DIR, file), "utf-8"));
		response["widgets"][widgetConfig.widgetName] = widgetConfig;
		let widgetTab = widgetConfig.widgetTab;

		// populate the tabs and the widgets that will be shown on those tabs
		if (!response["tabInfo"][widgetTab]) {
			response["tabInfo"][widgetTab] = [];
		}
		response["tabInfo"][widgetTab].push(widgetConfig.widgetName);
	});

	response["widgetsParentConfig"] = JSON.parse(widgetGlobalConfig);
	response["files"] = configFiles;

	// populating widgets that will be shown on home tabs
	response["tabInfo"]["home"] = [];
	let parentConfig = response["widgetsParentConfig"];
	Object.keys(parentConfig).forEach((widgetName) => {
		if (parentConfig[widgetName]["displayOnHome"]) {
			response["tabInfo"]["home"].push(widgetName);
		}
	});

	configJson = response;
	return response;
}

/**
 * Return all widgets available in all tabs
 */
exports.getAllWidgetNames = () => {
	let tabs = getConfigJson()["tabInfo"];
	let widgets = new Set();
	Object.keys(tabs).forEach((tabName) => {
		tabs[tabName].forEach((widgetName) => {
			widgets.add(widgetName);
		});
	});
	return Array.from(widgets);
};
