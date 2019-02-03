const fs = require("fs");

/**
 * Returns index file after manipulations to the content
 */
exports.getIndexFile = homeWidgets => {
	let scriptSource = getComponentScriptResources(homeWidgets);
	let indexFile = fs.readFileSync(
		`${process.cwd()}/server/index.html`,
		"utf-8"
	);
	indexFile = indexFile.replace("[[@componentScriptUrls]]", scriptSource);
	return indexFile;
};

/**
 * get the <script> tags for widgets that will be placed in index.html
 */
getComponentScriptResources = widgets => {
	let allScripts = "";
	widgets.forEach(widgetName => {
		let script = `<script type="text/javascript" src="widgets/${widgetName}/${widgetName}.template.js"></script>`;
		allScripts += script;
	});
	return allScripts;
};
