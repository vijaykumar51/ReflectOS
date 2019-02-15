var router = require("express").Router();
var controller = require("./uber.controller");
var config = require("./config.json");

router.get(config.widgetConfig["price-endpoint"], controller.getUberPrice);

module.exports = router;
