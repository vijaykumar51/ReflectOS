const request = require("request");
const tokens = require("@tokens");
const config = require("./config.json");

exports.getWeatherInfo = (req, res) => {
	let token = tokens[config.widgetName];
	let openWeatherApiUrl = `${config.apiUrl}?q=${config.widgetConfig.city},${
		config.widgetConfig.countryCode
	}&units=${config.widgetConfig.units}&appid=${token}`;

	request.get(openWeatherApiUrl, (error, response, body) => {
		if (error) {
			console.log("error", error);
			res.send(error);
		}
		res.json(JSON.parse(body));
	});
};
