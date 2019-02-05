class WeatherComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true));
		this.citySelector = this.shadowRoot.querySelector("#cityName");
		this.temperatureSelector = this.shadowRoot.querySelector("#temperature");
	}

	get city() {
		return this.getAttribute("city");
	}

	set city(val) {
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
		switch (name) {
			case "city":
				this.citySelector.innerHTML = newVal;
				break;
			case "temperature":
				this.temperatureSelector.innerHTML = newVal;
				break;
		}
	}

	connectedCallback() {
		console.log(this.city);
		console.log(this.temperature);

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
		</style>
		<div id="weatherTemplate">
			<div>Weather: <span id="cityName"><span></div>
			<div>temperature: <span id="temperature"><span></div>
		</div>
	  `;
