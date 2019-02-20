const { google } = require("googleapis");
const tokens = require("@tokens");
const config = require("./config.json");

const youtube = google.youtube({
	version: "v3"
});

/**
 * search video
 */
exports.searchVideo = (req, res) => {
	console.log("searchquery=", req.query.searchQuery);
	youtube.search
		.list({
			auth: tokens[config.widgetName],
			part: "snippet",
			type: "video",
			q: req.query.searchQuery,
			maxResults: 8
		})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
};

/**
 * Get popular videos from following video categories
 * 10 - Music
 * 17 - Sports
 * 23 - Comedy
 * 24 - Entertainment
 * 30 - Movies
 * 34 - Comedy
 * 44 - Trailers
 */
exports.getPopularVideos = (req, res) => {
	youtube.videos
		.list({
			auth: tokens[config.widgetName],
			part: "snippet",
			type: "video",
			maxResults: 20,
			chart: "mostPopular",
			regionCode: "in"
			// id: "10, 17, 23, 24, 30, 34, 44"
		})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
};
