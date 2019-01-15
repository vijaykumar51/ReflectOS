var express = require("express");
var app = express();
const port = 9090;

app.get("/", (req, res) => {
	res.send("Express server");
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
