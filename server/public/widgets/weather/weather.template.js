class WeatherComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true));
		this.citySelector = this.shadowRoot.querySelector("#cityName");
		this.temperatureSelector = this.shadowRoot.querySelector("#temperature");
		this.currentWeatherIconSelector = this.shadowRoot.querySelector("#currentWeatherIcon");
		this.currentWeatherLabelSelector = this.shadowRoot.querySelector(".weather-description");
		this.windSpeedSelector = this.shadowRoot.querySelector(".wind-speed");
		this.windDirectionSelector = this.shadowRoot.querySelector(".wind-direction");
	}

	connectedCallback() {
		fetch(this.getAttribute("currentweatherendpoint"))
			.then((response) => response.json())
			.then((data) => {
				this.citySelector.innerHTML = data.name;
				this.temperatureSelector.innerHTML = data.main.temp;

				let iconClass = this.getWeatherIconClass(data.weather[0].main);
				this.currentWeatherIconSelector.classList.add(iconClass);
				this.currentWeatherLabelSelector.innerHTML = data.weather[0].description;
				this.windSpeedSelector.innerHTML = data.wind.speed;

				let windDirectionClass = this.getWindDirectionClass(data.wind.deg);
				this.windDirectionSelector.classList.add(windDirectionClass);
			});
	}

	getWindDirectionClass(windAngle) {
		let angleDivider = 23;
		let towardsAngle = parseInt(windAngle - (windAngle % angleDivider));
		return `towards-${towardsAngle}-deg`;
	}

	getWeatherIconClass(weatherName) {
		let iconMapping = {
			clear: "wi-day-sunny",
			clouds: "wi-cloudy",
			rain: "wi-rain",
			drizzle: "wi-showers",
			mist: "wi-day-haze"
		};
		return iconMapping[weatherName.toLowerCase()];
	}
}

window.customElements.define("weather-component", WeatherComponent);

var weatherTemplate = document.createElement("template");
weatherTemplate.innerHTML = `
		<link rel="stylesheet" href="css/weather-icons.min.css" />
		<link rel="stylesheet" href="css/weather-icons-wind.min.css" />	
		<style>
			:host {
				display: inline-block;
				padding: 10px;
				text-shadow: 2px 2px 6px #333;
			}
			#weatherTemplate #cityName {
				text-transform: capitalize;
				font-size: 50px;
				padding-bottom: 10px;
				text-shadow: 2px 2px 6px #000;
			}
			#weatherTemplate #temperature {
				font-size: 70px;
				font-weight: bold;
				position: relative;
				top: -20px;
			}
			#weatherTemplate #currentWeatherIcon {
				font-size: 80px;
				position: relative;
				left: 20px;
				top: -10px;
			}
			#weatherTemplate #temperatureUnit {
				position: relative;
				top: -46px;
				font-size: 30px;
			}
			#weatherTemplate #weatherDescriptionSection {
				display: flex;
    			align-items: center;
				justify-content: space-evenly;
				text-transform: capitalize;
			}
			#weatherTemplate #weatherDescriptionSection .wind-direction {
				font-size: 35px;
			}
			#weatherTemplate #weatherDescriptionSection .wind-speed {
				margin-left: 5px;
				margin-right: 3px;
			}
		</style>
		<div id="weatherTemplate">
			<div style="padding-bottom: 20px;"><span id="cityName"></span></div>
			<div>
				<span id="temperature"></span>
				<span id="temperatureUnit"><sup>o</sup>C</span>
				<i id="currentWeatherIcon" class="wi"></i>
			</div>
			<div id="weatherDescriptionSection">
				<span class="wind-section">
					Wind:<span class="wind-speed"></span>m/s
				</span>
				<i class="wind-direction wi wi-wind"></i>
				<span class="weather-description">Cloudy</span>
			</div>
		</div>
	  `;
