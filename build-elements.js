const fs = require("fs-extra");
const concat = require("concat");

(async function build() {
	const files = [
		"./dist/client-app/runtime.js",
		"./dist/client-app/polyfills.js",
		"./dist/client-app/styles.js",
		"./dist/client-app/main.js"
	];

	// await fs.ensureDir("elements");
	await concat(files, "./server/widgets/card/card-element.js");
})();
