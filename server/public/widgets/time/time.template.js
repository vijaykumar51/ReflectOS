class TimeComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(timeTemplate.content.cloneNode(true));
		this.timeSelector = this.shadowRoot.querySelector("#time");
		this.dateSelector = this.shadowRoot.querySelector("#date");
	}

	connectedCallback() {
		setInterval(() => {
			this.timeSelector.innerHTML = moment().format("LT");
			this.dateSelector.innerHTML = moment().format("MMMM Do YYYY");
		}, 1000);
	}
}

window.customElements.define("time-component", TimeComponent);

var timeTemplate = document.createElement("template");
timeTemplate.innerHTML = `
	<style>
		:host {
			display: inline-block;
			text-shadow: 2px 2px 2px #000;
		}

		#timeTemplate #time {
			font-size: 80px;
		}
	</style>
	<div id="timeTemplate">
		<div id="time"></div>
		<div id="date"></div>
	</div>
`;
