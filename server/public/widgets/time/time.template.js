class TimeComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(timeTemplate.content.cloneNode(true));
		this.timeSelector = this.shadowRoot.querySelector("#time");
		this.dateSelector = this.shadowRoot.querySelector("#date");
	}

	connectedCallback() {
		this.updateTime();
		setInterval(this.updateTime.bind(this), 1000);
	}

	updateTime() {
		this.timeSelector.innerHTML = moment().format("LT");
		this.dateSelector.innerHTML = moment().format("MMMM Do YYYY");
	}
}

window.customElements.define("time-component", TimeComponent);

var timeTemplate = document.createElement("template");
timeTemplate.innerHTML = `
	<style>
		:host {
			display: inline-block;
			padding: 20px;
			text-shadow: 2px 2px 2px #333;
		}
		#timeTemplate #time {
			font-size: 80px;
			line-height: 80px;
			text-shadow: 2px 2px 2px #000;
		}
		#timeTemplate #date {
			font-size: 30px;
		}
	</style>
	<div id="timeTemplate">
		<div id="date"></div>	
		<div id="time"></div>
	</div>
`;
