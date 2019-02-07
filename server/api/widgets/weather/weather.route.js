var router = require("express").Router();
var controller = require("./weather.controller");

router.get("/api/current-weather", controller.getWeatherInfo);
router.get("/api/weather-forecast", controller.getWeatherForecast);

module.exports = router;
