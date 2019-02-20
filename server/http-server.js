require("module-alias/register");
var fs = require("fs");
var express = require("express");

var htmlUtls = require("./api/utils/html-utils");
var weatherRoutes = require("@widgets/weather/weather.route");
var newsRoutes = require("@widgets/news/news.route");
var uberRoutes = require("@widgets/uber/uber.route");
var youtubeRoutes = require("@widgets/youtube/youtube.route");
var configService = require("./api/core/config.service");

var app = express();
const port = 9090;

app.use(express.static(__dirname + "/public"));

app.use("/", weatherRoutes);
app.use("/", newsRoutes);
app.use("/", uberRoutes);
app.use("/", youtubeRoutes);

app.get("/", (req, res) => {
	let homeWidgets = configService.getAllWidgetNames();
	let indexFile = htmlUtls.getIndexFile(homeWidgets);
	res.type("html");
	res.send(indexFile);
});

app.get("/api/config", (req, res) => {
	let data = configService.getConfig().then((data) => {
		res.json(data);
	});
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
