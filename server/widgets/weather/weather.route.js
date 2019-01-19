var router = require("express").Router();
var controller = require("./weather.controller");

router.get("/api/weather", controller.getWeatherInfo);

module.exports = router;
