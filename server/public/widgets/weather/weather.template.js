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
				this.temperatureSelector.innerHTML = `${newVal}`;
				break;
		}
	}

	connectedCallback() {
		console.log(this.city);
		console.log(this.temperature);
		this.setAttribute("temperature", 24);

		// fetch(this.getAttribute("endpoint"))
		// 	.then((response) => response.json())
		// 	.then((data) => {
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
		<link rel="stylesheet" href="css/weather-icons.min.css" />	
		<style>
			:host {
				display: inline-block;
				padding: 10px;
				font-size: 100px;
			}
			#weatherTemplate #cityName {
				text-transform: capitalize;
				font-size: 50%;
				padding-bottom: 10%;
			}
			#weatherTemplate #temperature {
				font-size: 70%;
				font-weight: bold;
				position: relative;
				top: -20%;
			}
			#weatherTemplate #weatherIcon {
				font-size: 80%;
				position: relative;
				left: 10%;
			}
			#weatherTemplate #temperatureUnit {
				position: relative;
				top: -33%;
				font-size: 30%;
			}
		</style>
		<div id="weatherTemplate">
			<div><span id="cityName"><span></div>
			<div style="height: 100px;">
				<span id="temperature"></span>
				<span id="temperatureUnit"><sup>o</sup>C</span>
				<i id="weatherIcon" class="wi wi-storm-showers"></i>
			</div>
		</div>
	  `;
