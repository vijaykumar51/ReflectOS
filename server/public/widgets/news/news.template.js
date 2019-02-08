class NewsComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(newsTemplate.content.cloneNode(true));
		this.newsBodySelector = this.shadowRoot.querySelector("#newsBodyContainer");
	}

	connectedCallback() {
		fetch(this.getAttribute("newsApiEndpoint"))
			.then((data) => data.json())
			.then((data) => {
				let articles = data.articles;
				let articlesHtml = "";
				articles.forEach((article) => {
					let articleHeadingHtml = `<div class="news-heading">
						<span class="news-icon fab fa-readme"></span>${article.title}
						</div>`;
					articlesHtml += articleHeadingHtml;
				});
				this.newsBodySelector.innerHTML = articlesHtml;
			});
	}
}

window.customElements.define("news-component", NewsComponent);

var newsTemplate = document.createElement("template");
newsTemplate.innerHTML = `
		<link
			rel="stylesheet"
			href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
			integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
			crossorigin="anonymous"
		/>
	<style>
		:host {
			display: inline-block;
			padding: 20px;
		}
		#newsContainer {
			width: 500px;
		}
		#newsContainer #newsTabsContainer {
			border-bottom: 1px solid #ffc;
			box-shadow: 0px 3px 4px #666;
			margin-left: -20px;
			margin-right: -20px;
			margin-bottom: 10px;
		}
		#newsContainer #newsTabsContainer .news-tabs {
			display: flex;
			margin-left: 20px;
		}
		#newsContainer #newsTabsContainer .news-tab {
			padding: 6px 10px;
			border: 1px solid #efefef;
			border-bottom: 0px;
		}
		#newsContainer #newsTabsContainer .news-tab:first-child {
			padding-left: 20px;
		}
		#newsContainer #newsTabsContainer .news-tab.active {
			background: #f0f0d6;
			color: #013243;
			opacity: 0.8;
		}
		#newsContainer #newsTabsContainer .news-tab:hover {
			background: #f0f0d6;
			color: #013243;
			cursor: pointer;
			opacity: 0.6;
		}
		#newsContainer #newsBodyContainer .news-heading {
			margin: 4px 0;
		}
		#newsContainer #newsBodyContainer .news-heading:hover {
			text-decoration: underline;
			cursor: pointer;
		}
		#newsContainer #newsBodyContainer .news-icon {
			size: 20px;
			font-size: 20px;
			margin-right: 6px;
		}
	</style>
	<div id="newsContainer">
		<div id="newsTabsContainer">
			<div class="news-tabs">
				<div class="news-tab active">Hacker News</div>
				<div class="news-tab">Google India News</div>
				<div class="news-tab">BBC News</div>
			</div>
		</div>
		<div id="newsBodyContainer">
			<div class="news-heading">
				<span class="news-icon"></span>This is news heading 1. Hope you are enjoying the news.
			</div>
			<div class="news-heading">
				<span class="news-icon"></span>This is news heading 1. Hope you are enjoying the news.
			</div>
			<div class="news-heading">
				<span class="news-icon"></span>This is news heading 1. Hope you are enjoying the news.
			</div>
		</div>
	</div>
	
`;
