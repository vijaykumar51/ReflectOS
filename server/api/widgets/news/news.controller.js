let inshorts = require("./newsParser").init();

exports.getNewsHeadlines = (req, res) => {
	inshorts.getNews(req.query.topic, (err, result) => {
		if (err) {
			res.send(err);
		}
		res.json(result);
	});
};
