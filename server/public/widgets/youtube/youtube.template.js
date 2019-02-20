// import("https://www.youtube.com/iframe_api");
class YoutubeComponent extends HTMLElement {
	constructor() {
		super();
		this.done = false;

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(youtubeTemplate.content.cloneNode(true));
		this.youtubeIconSelector = this.shadowRoot.querySelector("#youtubeIcon");
		this.youtubeOverlaySelector = this.shadowRoot.querySelector("#youtubeOverlay");
		var tag = document.createElement("script");

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = this.shadowRoot.querySelector("#youtubeTemplate");
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	connectedCallback() {
		this.registerEvents();
		this.getPopularVideos();
		// this.onYouTubeIframeAPIReady();
	}

	registerEvents() {
		this.youtubeIconSelector.addEventListener("click", (event) => {
			this.youtubeOverlaySelector.style.display = "flex";
		});
	}

	getPopularVideos() {
		fetch(this.getAttribute("popular-video-endpoint"))
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onYouTubeIframeAPIReady() {
		setTimeout(() => {
			this.player =
				this.player ||
				new YT.Player(
					document.body.querySelector("youtube-component").shadowRoot.querySelector("#playerContainer"),
					{
						height: "390",
						width: "640",
						videoId: "M7lc1UVf-VE"
					}
				);
			console.log(this.player);
		}, 2000);
	}

	onPlayerReady(event) {
		event.target.playVideo();
	}

	onPlayerStateChange(event) {
		// if (event.data == YT.PlayerState.PLAYING && !done) {
		// 	setTimeout(() => {
		// 		this.stopVideo;
		// 	}, 6000);
		// 	this.done = true;
		// }
	}

	stopVideo() {
		this.player.stopVideo();
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
			height: 400px;
			display: flex;
			justify-content: space-evenly;
			width: 100%;
			flex-wrap: wrap;
			overflow-y: scroll;
			padding: 20px 20px 0px 20px;
			box-sizing: border-box;
		}
		#youtubeTemplate #queryResultContainer .video-result {
			color: #000;
			font-weight: 600;
		}
		#youtubeTemplate #queryResultContainer .video-result img {
			width: 200px;
		}
		#youtubeTemplate #queryResultContainer .video-result .video-label {
			width: 200px;
		}
		#youtubeTemplate #youtubeOverlay #playerContainer {
			display: none;
		}
	</style>
	
	<div id="youtubeTemplate">
		<div id="youtubeIcon">
		</div>
		<div id="youtubeOverlay">
			<div id="videoSearchBox">
				<input type="input" id="searchQuery">
				<button class="search-button">
					<span class="search-icon-container">
						<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 30px; fill: #fff;"><g class="style-scope yt-icon">
        					<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" class="style-scope yt-icon"></path>
							  </g>
						</svg>
					</span>
				</button>
			</div>
			<div id="videoListContainer">
				
				<div id="queryResultContainer">
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video about random item on youtube</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video about random item on youtube</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video about random item on youtube</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video about random item on youtube</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video about random item on youtube</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video about random item on youtube</div>
					</div>
				</div>
			</div>
			<div id="playerContainer">
			</div>
		</div>
	</div>
	
`;
