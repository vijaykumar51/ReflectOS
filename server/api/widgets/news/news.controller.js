const request = require("request");
const tokens = require("@tokens");
const config = require("./config.json");

exports.getNewsHeadlines = (req, res) => {
	let token = tokens[config.widgetName];
	let newsApiUrl = `${config.topHeadlinesApiUrl}?apiKey=${token}&sources=google-news-in`;
	// request.get(newsApiUrl, (error, response, body) => {
	// 	if (error) {
	// 		console.log(error);
	// 		res.send(error);
	// 	}
	// 	res.json(JSON.parse(body));
	// });
	res.json(dummyData);
};

let dummyData = {
	status: "ok",
	totalResults: 10,
	articles: [
		{
			source: {
				id: "hacker-news",
				name: "Hacker News"
			},
			author: null,
			title: "Open sourcing ClusterFuzz",
			description:
				"The latest news from Google on open source releases, major projects, events, and student outreach programs.",
			url: "https://opensource.googleblog.com/2019/02/open-sourcing-clusterfuzz.html",
			urlToImage:
				"https://2.bp.blogspot.com/-nkeb1u3Y9BI/XFxptc5vUNI/AAAAAAAAB1k/gk09sQm0qPMEYaAkz-7-WyevINhZzmIawCLcBGAs/w1200-h630-p-k-no-nu/image1.png",
			publishedAt: "2019-02-08T08:22:40.6374838Z",
			content:
				"Fuzzing is an automated method for detecting bugs in software that works by feeding unexpected inputs to a target program. It is effective at finding memory corruption bugs, which often have serioussecurityimplications. Manually finding these issues is both d… [+1919 chars]"
		},
		{
			source: {
				id: "hacker-news",
				name: "Hacker News"
			},
			author: "https://www.facebook.com/rachelandrewuk",
			title: "HTML, CSS and our vanishing industry entry points",
			description:
				"Some thoughts on entry points to web development today, and my fears about the loss of something that has enabled so many people without a traditional computer science background to be here.",
			url: "https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/",
			urlToImage: "http://rachelandrew.co.uk/perch/resources/rachelandrew-biog-w1200.jpg",
			publishedAt: "2019-02-08T08:07:54.6634712Z",
			content:
				"Published on the 30 January 2019 in css, web and tagged .\r\nLet's keep in touch\r\nA low traffic email list, keep up to date with where I am and what I've published.\r\nEveryone is angry about CSS again. Im not even going to try to summarize the arguments. However… [+6368 chars]"
		},
		{
			source: {
				id: "hacker-news",
				name: "Hacker News"
			},
			author: "TheBerkin",
			title: "TheBerkin/rant",
			description:
				"Rant – The all-purpose procedural text library. Contribute to TheBerkin/rant development by creating an account on GitHub.",
			url: "https://github.com/TheBerkin/rant",
			urlToImage: "https://avatars0.githubusercontent.com/u/1622492?s=400&v=4",
			publishedAt: "2019-02-08T07:38:08.8405183Z",
			content:
				"Rant is an all-purpose procedural text engine\r\nthat is most simply described as the opposite of Regex.\r\nIt has been refined to include a dizzying array of features for handling everything from\r\nthe most basic of string generation tasks to advanced dialogue ge… [+2221 chars]"
		},
		{
			source: {
				id: "hacker-news",
				name: "Hacker News"
			},
			author: "Mike Stipicevic",
			title: "German for Programmers",
			description:
				"After 2 years of learning German I’ve noticed that, for the most part, you can go a long way by mapping foreign concepts to ones that you already know. In particular, I’ve had success mapping aspects of German grammar to programming concepts I use every day. …",
			url: "https://wickedchicken.github.io/post/german-for-programmers/",
			urlToImage: null,
			publishedAt: "2019-02-08T03:37:54.5798843Z",
			content:
				"After 2 years of learning German I’ve noticed that, for the most part, you can\r\ngo a long way by mapping foreign concepts to ones that you already know. In\r\nparticular, I’ve had success mapping aspects of German grammar to programming\r\nconcepts I use every da… [+13074 chars]"
		},
		{
			source: {
				id: "hacker-news",
				name: "Hacker News"
			},
			author: null,
			title: "FindChips – Get instant insight into any electronic component",
			description:
				"Search for stock, prices and datasheets for electronic parts by distributor and manufacturer.",
			url: "https://www.findchips.com/",
			urlToImage: null,
			publishedAt: "2019-02-08T02:38:03.8583052Z",
			content:
				"You have a Findchips Basic account.\r\nYour account has reached its list limit (3 Lists). To create a new list, an existing list must be removed.\r\n Upgrade to Findchips Pro to increase your List count to 200\r\nUpgrade to FindChips PRO"
		},
		{
			source: {
				id: "hacker-news",
				name: "Hacker News"
			},
			author: "Owen Williams",
			title: "Google News is broken",
			description:
				"It's one of the biggest traffic drivers on the web, but Google's policies about how to get into the index are opaque, and applied at random.",
			url: "https://char.gd/blog/2019/google-news-is-broken",
			urlToImage: "https://char.gd/assets/_featured/chrome_2019-02-08_12-09-45.png",
			publishedAt: "2019-02-07T23:11:00Z",
			content:
				"There's been a lot of discussion about the future of publishing over the last few years, particularly as Facebook traffic began cratering, leaving publishers scrambling to find new sources of traffic. What's never really discussed, however, is how those platf… [+8127 chars]"
		}
	]
};
