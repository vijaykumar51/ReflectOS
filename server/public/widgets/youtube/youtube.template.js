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
		// import("https://www.youtube.com/iframe_api");
	}

	connectedCallback() {
		this.registerEvents();
		this.onYouTubeIframeAPIReady();
	}

	registerEvents() {
		this.youtubeIconSelector.addEventListener("click", (event) => {
			this.youtubeOverlaySelector.style.display = "flex";
		});
	}

	onYouTubeIframeAPIReady() {
		setTimeout(() => {
			this.player = new YT.Player("player", {
				height: "390",
				width: "640",
				videoId: "M7lc1UVf-VE"
			});
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
	</style>
	
	<div id="youtubeTemplate">
		<div id="youtubeIcon">
		</div>
		<div id="youtubeOverlay">
			<div id="playerContainer">
				<iframe width="420" height="315"
					src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1&controls=1"
					allowfullscreen = "true">
				</iframe>
			</div>
		</div>
	</div>
	
`;
