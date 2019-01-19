const request = require("request");
const tokens = require("@tokens");
const config = require("./config.json");

exports.get = async (req, res) => {
	let token = tokens[config.widgetName];
	console;
	let openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
		config.widgetConfig.city
	},${config.widgetConfig.countryCode}&appid=${token}`;

	request.get(openWeatherApiUrl, (error, respose, body) => {
		if (error) {
			console.log("error", error);
			res.send(error);
		}
		res.json(JSON.parse(body));
	});
};
