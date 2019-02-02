require("module-alias/register");
var express = require("express");
var routes = require("@widgets/weather/weather.route");

var app = express();
const port = 9090;

app.use(express.static(__dirname + "/public"));

app.use("/", routes);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
