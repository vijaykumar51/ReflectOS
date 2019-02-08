const request = require("request");
const tokens = require("@tokens");
const config = require("./config.json");

exports.getNewsHeadlines = (req, res) => {
	let token = tokens[config.widgetName];
	let newsApiUrl = `${config.topHeadlinesApiUrl}?apiKey=${token}&sources=${req.query.sources}&pageSize=${
		config.widgetConfig.pageSize
	}`;

	request.get(newsApiUrl, (error, response, body) => {
		if (error) {
			console.log(error);
			res.send(error);
		}
		res.json(JSON.parse(body));
	});
};
