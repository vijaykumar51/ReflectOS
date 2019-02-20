const router = require("express").Router();
const controller = require("./youtube.controller");
const config = require("./config.json");

router.get(config.widgetConfig["search-video-endpoint"], controller.searchVideo);
router.get(config.widgetConfig["popular-video-endpoint"], controller.getPopularVideos);

module.exports = router;
