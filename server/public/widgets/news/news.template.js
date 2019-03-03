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
		let newsDetailOverlay = this.shadowRoot.querySelector("#newsDetailOverlay");
		let newsBodyContainer = this.shadowRoot.querySelector("#newsBodyContainer");
		let newsTabs = this.shadowRoot.querySelectorAll(".news-tab");

		// fetch news when click on new news category
		newsTabs.forEach((newsTab) => {
			newsTab.addEventListener("click", (event) => {
				let oldSelectedTab = this.shadowRoot.querySelector(".news-tab.active");
				oldSelectedTab.classList.remove("active");
				//using path to get the clicked element inside shadow root
				let selectedSource = event.path[0];
				selectedSource.classList.add("active");

				let apiQuerySting = selectedSource.getAttribute("querystring");
				this.getNews(apiQuerySting);
			});
		});

		// show overlay on click on news headline
		newsBodyContainer.addEventListener("click", (event) => {
			let index = event.path[0].getAttribute("index");
			if (index !== null && index >= 0 && this.newsData) {
				let newsDetails =
					this.newsData.body && this.newsData.body[index]
						? this.newsData.body[index]
						: "Unable to fetch news details";
				let newsImageUrl = this.newsData.image && this.newsData.image[index] ? this.newsData.image[index] : "";
				let newsHeading =
					this.newsData.headline && this.newsData.headline[index] ? this.newsData.headline[index] : "";

				let newsImageSelector = this.shadowRoot.querySelector("#newsImage");
				let newsHeadingSelector = this.shadowRoot.querySelector("#newsHeading");
				let newsDetailSelector = this.shadowRoot.querySelector("#newsDetails");

				newsDetailOverlay.style.display = "flex";
				newsImageSelector.style.backgroundImage = `url(${newsImageUrl})`;
				newsHeadingSelector.innerHTML = newsHeading;
				newsDetailSelector.innerHTML = newsDetails;
			}
		});

		// close news overlay
		let closeNewsOverlaySelector = this.shadowRoot.querySelector("#closeNewsOverlay");
		closeNewsOverlaySelector.addEventListener("click", (event) => {
			newsDetailOverlay.style.display = "none";
		});
	}

	// get news based on selected source
	getNews(queryString) {
		fetch(`${this.getAttribute("newsApiEndpoint")}?${queryString}`)
			.then((data) => data.json())
			.then((data) => {
				this.newsData = data;
				let headlines = data.headline;
				let headlinesHtml = "";
				headlines.forEach((article, index) => {
					let articleHeadingHtml = `<div class="news-heading" index=${index}>
						<span class="news-icon fab fa-readme"></span>${article}
						</div>`;
					headlinesHtml += articleHeadingHtml;
				});
				this.newsBodySelector.innerHTML = headlinesHtml;
			})
			.catch((err) => {
				console.error(err);
				this.newsBodySelector.innerHTML = "Unable to fetch news";
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
		::-webkit-scrollbar { 
			height: 8px;
			width: 6px;
			background: rgba(240, 240, 214, 0.4);
			border-radius: 1em;
		}
		
		::-webkit-scrollbar-thumb {
			background: #ffc;
			-webkit-border-radius: 1ex;
		}
		
		::-webkit-scrollbar-corner {
			background: #ffc;
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

		#newsContainer #newsDetailOverlay {
			display: none;
			background-color: rgba(0,0,0, 0.8);
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			align-items: center;
    		justify-content: center;
			width: 100%;
			z-index: 10000;
		}

		#newsContainer #newsDetailOverlay #newsDetailContainer {
			height: 500px;
			width: 600px;
			background: #efefef;
			box-shadow: 0px 0px 15px #666 inset;
			position: relative;
		} 
		#newsContainer #newsDetailContainer #newsImage {
			background-repeat: no-repeat;
			background-size: 100% 100%;
			box-shadow: 0px 1px 15px #666;
			height: 50%;
			width: 100%;
		}
		#newsContainer #newsDetailContainer #newsHeading {
			color: #000;
			font-size: 24px;
			padding: 20px 20px 0px 20px;
			font-weight: bold;
			text-shadow: 0px 0px 3px #666;
			text-align: justify;
		}
		#newsContainer #newsDetailContainer #newsDetails {
			color: #333;
    		padding: 10px 20px;
    		text-align: justify;
		}
		#newsContainer #newsDetailContainer #closeNewsOverlay {
			font-size: 36px;
			color: #efefef;
			text-shadow: 2px 2px 7px #333;
			position: absolute;
			right: 16px;
			top: 10px;
		}
		#newsContainer #newsDetailContainer #closeNewsOverlay:hover {
			color: #999;
			cursor: pointer;
		}
	</style>
	<div id="newsContainer">
		<div id="newsTabsContainer">
			<div class="news-tabs">
			</div>
		</div>
		<div id="newsBodyContainer">
		</div>
		<div id="newsDetailOverlay">
			<div id="newsDetailContainer">
				<span id="closeNewsOverlay" class="fa fa-times"></span>
				<div id="newsImage">
				</div>
				<div id="newsHeading">
				</div>
				<div id="newsDetails">
				</div>
			</div>
		</div>
	</div>
	
`;
