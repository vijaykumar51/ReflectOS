class UberComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(uberTemplate.content.cloneNode(true));
		this.distanceSelector = this.shadowRoot.querySelector("#distance");
		this.durationSelector = this.shadowRoot.querySelector("#duration");
		this.priceDetailSelector = this.shadowRoot.querySelector("#priceDetails");
	}

	connectedCallback() {
		// TODO: uncomment this when code is ready for deployment
		this.fetchJourneyEstimates();
	}

	fetchJourneyEstimates() {
		fetch(this.getAttribute("estimate-endpoint"))
			.then((data) => data.json())
			.then((data) => {
				let distanceInKm = null;
				let tripDuration = null;

				let priceFinalHtml = "";
				Object.keys(data).forEach((vehicleType) => {
					let priceHtml = `<div id=${vehicleType.replace(" ", "")} class="price-container">
								<div class="vehicle-type">${vehicleType}</div>
								<div class="vehicle-price">${data[vehicleType].fare.display}</div>
								<div class="vehicle-eta">${data[vehicleType].pickup_estimate} m</div>
							</div>`;
					priceFinalHtml += priceHtml;
					distanceInKm = (data[vehicleType].trip.distance_estimate * 1.609).toFixed(2);
					tripDuration = data[vehicleType].trip.duration_estimate / 60;
				});
				this.distanceSelector.innerHTML = `Distance: <b>${distanceInKm}</b> Km`;
				this.durationSelector.innerHTML = `Trip Duration: <b>${tripDuration}</b> min`;
				this.priceDetailSelector.innerHTML = priceFinalHtml;
			});
	}
}

window.customElements.define("uber-component", UberComponent);

var uberTemplate = document.createElement("template");
uberTemplate.innerHTML = `
	<link
		rel="stylesheet"
		href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
		integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
		crossorigin="anonymous"
	/>
	<style>
		:host {
			display: inline-block;
			padding: 20px;
		}
		#uberContainer .fa-uber {
			font-size: 50px;
			text-shadow: 2px 2px 2px #333;
		}
		#uberContainer .uber-label {
			font-size: 40px;
			font-weight: 600;
			padding: 0px 20px;
			text-shadow: 2px 2px 2px #333;
		}
		#uberContainer #rideDetailsContainer {
			margin-top: 10px;
			width: 330px;
		}	
		#uberContainer #priceDetails {
			display: flex;
			justify-content: space-between;
			margin-top: 10px;
		}
		#uberContainer #priceDetails .vehicle-price {
			font-weight: 700;
			font-size: 18px;
		}
		#uberContainer #etaDetailsContainer {
			margin-top: 20px;
		}
	</style>
	<div id="uberContainer">
		<div id="uberHeader">
			<span class="fab fa-uber"></span>
			<span class="uber-label">Uber</span>
		</div>
		<div id="rideDetailsContainer">
			<div id="distance"></div>
			<div id="duration"></div>
			<div id="priceDetails"></div>
		</div>
	</div>
`;
