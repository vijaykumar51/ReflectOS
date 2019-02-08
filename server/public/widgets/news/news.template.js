class NewsComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(newsTemplate.content.cloneNode(true));
	}

	connectedCallback() {
		console.log(this.getAttribute("tabs"));
		console.log(this.getAttribute("refreshFrequency"));
	}
}

window.customElements.define("news-component", NewsComponent);

var newsTemplate = document.createElement("template");
newsTemplate.innerHTML = `
	<style>
		:host {
			display: inline-block;
			padding: 20px;
		}
		#newsContainer #newsTabsContainer {
			display: flex;
			border-bottom: 1px solid #ffc;
			width: 500px;
		}
		#newsContainer #newsTabsContainer .news-tab {
			padding: 6px 10px;
			border: 1px solid #efefef;
			border-bottom: 0px;
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
			margin: 3px 0;
		}
		#newsContainer #newsBodyContainer .news-heading:hover {
			text-decoration: underline;
			cursor: pointer;
		}
		#newsContainer #newsBodyContainer .news-icon {

		}
	</style>
	<div id="newsContainer">
		<div id="newsTabsContainer">
			<div class="news-tab active">Hacker News</div>
			<div class="news-tab">Google India News</div>
			<div class="news-tab">BBC News</div>
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
