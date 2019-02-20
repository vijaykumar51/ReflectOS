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
		}
		#youtubeTemplate #youtubeOverlay #videoListContainer {
			width: 1000px;
		}
		#youtubeTemplate #youtubeOverlay #queryResultContainer {
			height: 400px;
			background: #999;
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			overflow-y: scroll;
		}
		#youtubeTemplate #queryResultContainer .video-result img {
			width: 250px;
		}
		#youtubeTemplate #youtubeOverlay #playerContainer {
			display: none;
		}
	</style>
	
	<div id="youtubeTemplate">
		<div id="youtubeIcon">
		</div>
		<div id="youtubeOverlay">
			<div id="videoListContainer">
				<div id="videoSearchBox">
					<input type="input" id="searchQuery">
					<button>Search</button>
				</div>
				<div id="queryResultContainer">
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video</div>
					</div>
					<div class="video-result">
						<div class="video-image">
							<img src="https://i.ytimg.com/vi/xWgCMicmmCg/mqdefault.jpg"></img>
						</div>
						<div class="video-label">A funny video</div>
					</div>
				</div>
			</div>
			<div id="playerContainer">
			</div>
		</div>
	</div>
	
`;
