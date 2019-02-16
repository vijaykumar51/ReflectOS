var router = require("express").Router();
var controller = require("./uber.controller");
var config = require("./config.json");

router.get(config.widgetConfig["price-endpoint"], controller.getUberPrice);
router.get(config.widgetConfig["vehicle-eta-endpoint"], controller.getVehicleETA);
router.get(config.widgetConfig["products-endpoint"], controller.getProducts);
module.exports = router;
