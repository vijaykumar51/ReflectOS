class NewsComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(newsTemplate.content.cloneNode(true));
		this.newsBodySelector = this.shadowRoot.querySelector("#newsBodyContainer");
		this.newsTabsSelector = this.shadowRoot.querySelector(".news-tabs");
		this.tabSelector = this.shadowRoot.querySelector(".news-tab");
	}

	connectedCallback() {
		this.prepareNewsTabs();
		this.registerClickListeners();

		let apiQueryString = this.shadowRoot.querySelector(".news-tab.active").getAttribute("queryString");
		this.getNews(apiQueryString);
	}

	registerClickListeners() {
		let newsTabs = this.shadowRoot.querySelectorAll(".news-tab");
		newsTabs.forEach((newsTab) => {
			newsTab.addEventListener("click", (event) => {
				//using path to get the clicked element inside shadow root
				let selectedSource = event.path[0];
				let apiQuerySting = selectedSource.getAttribute("querystring");
				this.getNews(apiQuerySting);
			});
		});
	}

	// get news based on selected source
	getNews(queryString) {
		fetch(`${this.getAttribute("newsApiEndpoint")}?${queryString}`)
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

	// prepare html for tabs based on config
	prepareNewsTabs() {
		let tabsInfo = JSON.parse(this.getAttribute("tabs"));
		let tabsHtml = "";
		tabsInfo.forEach((tabInfo, index) => {
			let tabHtml = `<div id="${tabInfo.id}" 
					class="news-tab ${index === 0 ? "active" : ""}" 
					querystring=${tabInfo.queryString}>
				${tabInfo.Label}</div>`;
			tabsHtml += tabHtml;
		});
		this.newsTabsSelector.innerHTML = tabsHtml;
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
		#newsContainer #newsBodyContainer {
			max-height: 180px;
    		overflow: auto;
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
			</div>
		</div>
		<div id="newsBodyContainer">
		</div>
	</div>
	
`;
