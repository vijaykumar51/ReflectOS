var router = require("express").Router();
var controller = require("./news.controller");

router.get("/api/news", controller.getNewsHeadlines);

module.exports = router;
