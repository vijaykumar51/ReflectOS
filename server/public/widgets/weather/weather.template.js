class WeatherComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true));
		this.citySelector = this.shadowRoot.querySelector("#cityName");
		this.temperatureSelector = this.shadowRoot.querySelector(
			"#temperature"
		);
	}

	get city() {
		// console.log("returning complete");
		return this.getAttribute("city");
	}

	set city(val) {
		console.log("setting city", val);
		this.setAttribute("city", val);
	}

	get temperature() {
		this.getAttribute("temperature");
	}

	set temperature(temp) {
		this.setAttribute("temperature", temp);
	}

	static get observedAttributes() {
		return ["city", "temperature"];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		console.log(`${name} changed to ${newVal}`);
		// var innerBar = this.shadowRoot.querySelector("#cityName");
		switch (name) {
			case "city":
				this.citySelector.innerHTML = newVal;
				break;
			case "temperature":
				this.temperatureSelector.innerHTML = newVal;
		}
	}

	connectedCallback() {
		setTimeout(() => {
			this.setAttribute("city", "jind");
			this.setAttribute("temperature", 10);
		}, 2000);
		// fetch("/api/weather")
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		console.log(data);
		// 		console.log(data.name);
		// 		console.log(data.main.temp);
		// 		this.setAttribute("city", data.name);
		// 		this.setAttribute("temperature", data.main.temp);
		// 	});
	}
}

window.customElements.define("weather-component", WeatherComponent);

var weatherTemplate = document.createElement("template");
weatherTemplate.innerHTML = `
		<style>
			:host {
				display: block;
			}
			h2 {
				color: #567;
			}
		</style>
		<div>
			<div>Weather: <span id="cityName"><span></div>
			<div>temperature: <span id="temperature"><span></div>
		</div>
	  `;
