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
			let clickedFolder = event.path[0].getAttribute("folder-name");
			let cleanedFolderName = clickedFolder.replace(/#/g, " ");
			this.currentDirectory = path.resolve(this.currentDirectory, cleanedFolderName);
			this.populateDirectoryItems(this.currentDirectory);
			console.log("currentDir", this.currentDirectory);
		});
	}

	// read the content of a directory and populate html for the display
	populateDirectoryItems(directoryPath) {
		console.log(directoryPath);
		let dirInfo = fs.readdirSync(directoryPath);
		let listHtml = "";
		dirInfo.forEach((item) => {
			let itemInfo = fs.statSync(directoryPath, path.resolve(item));
			console.log(itemInfo);
			if (itemInfo.isDirectory()) {
				let itemId = item.replace(/ /g, "#");
				let itemHtml = `
					<div class="dir-list-item" folder-name=${itemId}>
						<span class="folder-icon fas fa-folder-open" folder-name=${itemId}></span>
						<span class="list-item-label" folder-name=${itemId}>${item}</span>
					</div>
				`;
				listHtml += itemHtml;
			}
		});
		this.dirListContainerSelector.innerHTML = listHtml;
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
