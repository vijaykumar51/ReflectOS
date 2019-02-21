// import("https://www.youtube.com/iframe_api");
class YoutubeComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(youtubeTemplate.content.cloneNode(true));
		this.youtubeIconSelector = this.shadowRoot.querySelector("#youtubeIcon");
		this.youtubeOverlaySelector = this.shadowRoot.querySelector("#youtubeOverlay");
		this.youtubePlayerParentContainerSelector = this.shadowRoot.querySelector("#youtubePlayerParentContainer");
		this.queryResultSelector = this.shadowRoot.querySelector("#queryResultContainer");
		this.searchButtonSelector = this.shadowRoot.querySelector("#youtubeSearchButton");
		this.dummy = "slkfj";
		var tag = document.createElement("script");

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = this.shadowRoot.querySelector("#youtubeTemplate");
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	connectedCallback() {
		this.registerEvents();
		this.getPopularVideos();
	}

	registerEvents() {
		this.youtubeIconSelector.addEventListener("click", (event) => {
			this.youtubeOverlaySelector.style.display = "flex";
		});
		// perform search operation with entered query in search box
		this.searchButtonSelector.addEventListener("click", (event) => {
			let searchQuery = this.shadowRoot.getElementById("searchQuery").value;
			console.log("searchQuery", searchQuery);

			fetch(`${this.getAttribute("search-video-endpoint")}?searchQuery=${searchQuery}`)
				.then((data) => data.json())
				.then((data) => {
					console.log(data);
					let searchVideoHtml = this.prepareSearchResults(data.data);
					this.queryResultSelector.innerHTML = searchVideoHtml;
				})
				.catch((err) => console.error(err));
		});
		this.queryResultSelector.addEventListener("click", (event) => {
			let videoId = event.path[0].getAttribute("video-id");
			this.playYoutubeVideoById(videoId);
		});
	}

	getPopularVideos() {
		fetch(this.getAttribute("popular-video-endpoint"))
			.then((data) => data.json())
			.then((data) => {
				if (data.status === 200) {
					let recommendVideosHtml = this.prepareSearchResults(data.data);
					this.queryResultSelector.innerHTML = recommendVideosHtml;
					/**
					 * get the youtube player ready
					 * adding timout of 2 seconds so that youtube scripts can be loaded before initialization
					 */
					setTimeout(() => {
						this.initializeYoutubePlayer();
					}, 2000);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	prepareSearchResults(data) {
		let videos = data.items;
		let finalHtml = "";
		videos.forEach((videoInfo, index) => {
			let videoHtml = `
				<div class="video-result">
					<div class="video-image" video-id="${videoInfo.id}">
						<span class="video-number" video-number="${index + 1}">${index + 1}</span>	
						<img src="${videoInfo.snippet.thumbnails.medium.url}" video-id="${videoInfo.id}"/>
					</div>
					<div class="video-label" video-id="${videoInfo.id}">${videoInfo.snippet.title}</div>
				</div>
						`;
			finalHtml += videoHtml;
		});
		return finalHtml;
	}

	initializeYoutubePlayer() {
		this.youtubePlayer =
			this.youtubePlayer ||
			new YT.Player(
				document.body.querySelector("youtube-component").shadowRoot.querySelector("#youtubePlayerContainer"),
				{
					height: "500",
					width: "1000"
				}
			);
		console.log(this.youtubePlayer);
	}

	playYoutubeVideoById(videoId) {
		if (!this.youtubePlayer) {
			this.initializeYoutubePlayer();
		}
		if (videoId) {
			this.queryResultSelector.style.display = "none";
			this.youtubePlayerParentContainerSelector.style.display = "flex";
			this.youtubePlayer.loadVideoById(videoId);
		}
	}
}

window.customElements.define("youtube-component", YoutubeComponent);

var youtubeTemplate = document.createElement("template");
youtubeTemplate.innerHTML = `
	<style>
		:host {
			display: inline-block;
		}
		#youtubeTemplate #youtubeIcon {
			background: url("images/youtube-logo.png");
			background-size: 100%;
			background-repeat: no-repeat;
			cursor: pointer;
			height: 150px;
			width: 200px;
		}
		#youtubeTemplate #youtubeOverlay {
			display: none;
			background-color: rgba(0,0,0, 0.8);
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			align-items: center;
    		justify-content: center;
			width: 100%;
			flex-direction: column;
		}
		#youtubeTemplate #videoSearchBox {
			width: 1000px;
			display: flex;
		}
		#youtubeTemplate #videoSearchBox #searchQuery {
			width: 90%;
			font-size: 18px;
			line-height: 29px;
			padding-left: 5px;
			box-sizing: border-box;
			box-shadow: inset 0 0px 7px #999;
		}
		#youtubeTemplate #videoSearchBox .search-button {
			width: 10%;
			height: 35px;
			background: #ff0000;
			border: 0px;
		}
		#youtubeTemplate #videoSearchBox .search-icon-container {
			height: 30px;
			width: 30px;
		}
		#youtubeTemplate #youtubeOverlay #videoListContainer {
			width: 1000px;
			background: rgba(255,255,255, 0.8);
		}
		#youtubeTemplate #youtubeOverlay #queryResultContainer {
			height: 500px;
			display: flex;
			justify-content: space-evenly;
			width: 100%;
			flex-wrap: wrap;
			padding: 20px 20px 0px 20px;
			box-sizing: border-box;
		}
		#youtubeTemplate #queryResultContainer .video-result {
			color: #232323;
			font-weight: 600;
			padding-bottom: 15px;
		}
		#youtubeTemplate #queryResultContainer .video-result img {
			width: 200px;
			cursor: pointer;
			box-shadow: 0 0 10px #333;
			border-radius: 8px;
		}
		#youtubeTemplate #queryResultContainer .video-result .video-image {
			position: relative;
		}
		#youtubeTemplate #queryResultContainer .video-image .video-number {
			background: #4c4b4bfa;
			color: #fff;
			padding: 3px;
			width: 20px;
			position: absolute;
			top: -14px;
			left: -12px;
			text-align: center;
			border-radius: 5px;
		}
		#youtubeTemplate #queryResultContainer .video-result .video-label {
			width: 200px;
			cursor: pointer;
			font-size: 14px;
		}
		#youtubeTemplate #youtubeOverlay #youtubePlayerParentContainer {
			display: none;
		}
	</style>
	
	<div id="youtubeTemplate">
		<div id="youtubeIcon">
		</div>
		<div id="youtubeOverlay">
			<div id="videoSearchBox">
				<input type="input" id="searchQuery" placeholder="Search">
				<button class="search-button" id="youtubeSearchButton">
					<span class="search-icon-container">
						<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 30px; fill: #fff;"><g class="style-scope yt-icon">
        					<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" class="style-scope yt-icon"></path>
							  </g>
						</svg>
					</span>
				</button>
			</div>

			<div id="videoListContainer">
				<div id="queryResultContainer"></div>
			</div>
			<div id="youtubePlayerParentContainer">
				<div id="youtubePlayerContainer"></div>
			</div>
		</div>
	</div>
	
`;
