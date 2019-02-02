class ProgressBar extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: "open" });
		// this.complete = 0;
	}

	get complete() {
		// console.log("returning complete");
		return this.getAttribute("complete");
	}

	// set complete(val) {
	// 	console.log("complete", val);
	// 	this.setAttribute("complete", parseInt(val));
	// }

	static get observedAttributes() {
		return ["complete"];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		console.log(`${name} changed to ${newVal}`);
		var innerBar = this.shadow.querySelector(".progress-bar-inner");
		switch (name) {
			case "complete":
				innerBar.style.width = this.complete + "%";
				innerBar.innerHTML = this.complete + "%";
		}
	}

	connectedCallback() {
		// this.complete = 0;
		var progressBarTemplate = `
		<style>
		  .progress-bar {
			width: 50%;
			height: 30px;
			background-color: #EDF2F4;
			border-radius: 5px;
			color: #FFF;
		  }
  
		  .progress-bar-inner {
			height: 100%;
			line-height: 30px;
			background: #2B2D42;
			text-align: center;
			border-radius: 5px;
			transition: width 0.25s;
		  }
		</style>
		<div class="progress-bar">
		  <div class="progress-bar-inner"></div>
		</div>
	  `;

		this.shadow.innerHTML = progressBarTemplate;

		var comp = 0;
		var progressInterval = setInterval(() => {
			comp += 1;
			if (comp <= 100) {
				this.setAttribute("complete", comp);
			} else {
				clearInterval(progressInterval);
			}
		}, 100);
	}
}

window.customElements.define("progress-bar", ProgressBar);
