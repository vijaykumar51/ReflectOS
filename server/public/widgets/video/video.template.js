const fs = require("fs");
const path = require("path");

class VideoComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(videoTemplate.content.cloneNode(true));
		this.videoIconSelector = this.shadowRoot.querySelector("#videoIcon");
		this.videoOverlaySelector = this.shadowRoot.querySelector("#videoOverlay");
		this.videoOverlayCloseIconSelector = this.shadowRoot.querySelector("#videoOverlayCloseIcon");
		this.videoAppContainerSelector = this.shadowRoot.querySelector("#videoAppContainer");
		this.dirListContainerSelector = this.shadowRoot.querySelector("#dirListContainer");
	}

	connectedCallback() {
		this.registerEvents();
	}

	registerEvents() {
		this.videoIconSelector.addEventListener("click", (event) => {
			this.videoOverlaySelector.style.display = "flex";
			this.currentDirectory = this.getAttribute("videoDirectory");
			this.populateDirectoryItems(this.getAttribute("videoDirectory"));
		});

		this.videoOverlayCloseIconSelector.addEventListener("click", (event) => {
			this.videoOverlaySelector.style.display = "none";
		});

		// navigate to folder on which user clicks
		this.dirListContainerSelector.addEventListener("click", (event) => {
			let clickedItemType = event.path[0].getAttribute("type");
			if (clickedItemType === "dir") {
				let clickedFolder = event.path[0].getAttribute("folder-name");
				let isPreviousDirectoryLink =
					Array.from(event.path[0].classList).indexOf("previous-directory") >= 0 ? true : false;

				// if the clicked link is for previous directory, navigate to previous directory else open the clicked folder
				if (isPreviousDirectoryLink) {
					this.currentDirectory = this.currentDirectory.substr(
						0,
						this.currentDirectory.lastIndexOf(path.sep)
					);
					this.populateDirectoryItems(this.currentDirectory);
				} else {
					let cleanedFolderName = clickedFolder.replace(/#/g, " ");
					this.currentDirectory = path.resolve(this.currentDirectory, cleanedFolderName);
					this.populateDirectoryItems(this.currentDirectory);
				}
				console.log("currentDir", this.currentDirectory);
			} else if (clickedItemType === "file") {
				console.log("you clicked file");
			}
		});
	}

	// read the content of a directory and populate html for the display
	populateDirectoryItems(directoryPath) {
		console.log(directoryPath);

		let listHtml = `
			<div class="dir-list-item previous-directory" type="dir">
				<span class="folder-icon previous-directory fa fa-arrow-left" type="dir"></span>
			</div>
		`;

		let dirInfo = fs.readdirSync(directoryPath);
		dirInfo.forEach((item) => {
			let itemStats = fs.statSync(path.resolve(directoryPath, item));
			if (itemStats.isDirectory()) {
				let itemId = item.replace(/ /g, "#");
				let dirHtml = `
						<div class="dir-list-item" folder-name=${itemId} type="dir">
							<span class="folder-icon fas fa-folder-open" folder-name=${itemId} type="dir"></span>
							<span class="list-item-label" folder-name=${itemId} type="dir">${item}</span>
						</div>
					`;
				listHtml += dirHtml;
			} else if (itemStats.isFile() && (this.isVideoFile(item) || this.isAudioFile(item))) {
				let itemId = item.replace(/ /g, "#");
				let fileHtml = `
					<div class="dir-list-item" folder-name=${itemId} type="file">
						<span class="folder-icon fas fa-folder-open" folder-name=${itemId} type="file"></span>
						<span class="list-item-label" folder-name=${itemId} type="file">${item}</span>
					</div>
				`;
				listHtml += fileHtml;
			}
		});
		this.dirListContainerSelector.innerHTML = listHtml;
	}

	isAudioFile(fileName) {
		let audioFormats = ["mp3"];
		let extension = fileName.substr(fileName.lastIndexOf(".") + 1);
		console.log(extension);
		return audioFormats.indexOf(extension) >= 0;
	}

	isVideoFile(fileName) {
		let videoFormats = ["mp4"];
		let extension = fileName.substr(fileName.lastIndexOf(".") + 1);
		console.log(extension);
		return videoFormats.indexOf(extension) >= 0;
	}
}

const videoTemplate = document.createElement("template");
videoTemplate.innerHTML = `
	<link
		rel="stylesheet"
		href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
		integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
		crossorigin="anonymous"
	/>
	<style>
		:host {
			display: inline-block;
		}
		#videoTemplate #videoIcon {
			background: url("images/movie-icon-1.png");
			background-repeat: no-repeat;
			background-size: 100%;
			cursor: pointer;
			height: 150px;
			width: 150px;
		}
		#videoTemplate #videoOverlay {
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
		#videoTemplate #videoOverlay #videoOverlayCloseIcon {
			font-weight: bold;
			position: absolute;
			right: 20px;
			top: 20px;
			color: #bbb;
			font-size: 36px;
			cursor: pointer;
		}
		#videoTemplate #videoOverlay #videoOverlayCloseIcon:hover {
			color: #999;
		}
		#videoTemplate #videoAppContainer {
			width: 80%;
		}
		#videoTemplate #dirListContainer {
			height: 500px;
			overflow: auto;
		}
		#videoTemplate #dirListContainer .dir-list-item {
			border-top: 1px solid #ffc;
			color: #ffc;
			cursor: pointer;
			font-size: 20px;
			padding: 10px;
			overflow: auto;
		}
		#videoTemplate #dirListContainer .dir-list-item:hover {
			background: rgba(240, 240, 214, 0.3);
		}
		#videoTemplate #dirListContainer .dir-list-item .list-item-label {
			padding-left: 15px;
		} 
	</style>
	<div id="videoTemplate">
		<div id="videoIcon"></div>
		<div id="videoOverlay">
			<span id="videoOverlayCloseIcon" class="fa fa-times"></span>
			<div id="videoAppContainer">
				<div id="dirListContainer">
				</div>
			</div>
		</div>
	</div>
	
`;

window.customElements.define("video-component", VideoComponent);