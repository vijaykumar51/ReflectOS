class TimeComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(timeTemplate.content.cloneNode(true));
		this.timeSelector = this.shadowRoot.querySelector("#time");
	}

	get time() {
		return this.getAttribute("time");
	}

	set time(time) {
		this.setAttribute("time", time);
	}

	static get observedAttributes() {
		return ["time"];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		switch (name) {
			case "time":
				this.timeSelector.innerHTML = newVal;
				break;
		}
	}

	connectedCallback() {
		setInterval(() => {
			let date = new Date();
			let changedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
			this.setAttribute("time", changedDate);
		}, 1000);
	}
}

window.customElements.define("time-component", TimeComponent);

var timeTemplate = document.createElement("template");
timeTemplate.innerHTML = `
	<style>
		:host {
			display: block;
		}
	</style>
	<div id="timeTemplate">
		<div id="time"></div>
	</div>
`;
