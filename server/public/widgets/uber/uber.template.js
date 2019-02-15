class UberComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(uberTemplate.content.cloneNode(true));
		this.distanceSelector = this.shadowRoot.querySelector("#distance");
		this.priceDetailSelector = this.shadowRoot.querySelector("#priceDetails");
	}

	connectedCallback() {
		fetch(this.getAttribute("price-endpoint"))
			.then((data) => data.json())
			.then((data) => {
				let allowedVehicles = ["Auto GGN", "Pool", "MOTO", "UberGo"];
				let distanceInKm = (data.prices[0].distance * 1.609).toFixed(2);
				this.distanceSelector.innerHTML = `Distance: <b>${distanceInKm}</b> Km`;

				let priceFinalHtml = "";
				data.prices.forEach((priceInfo) => {
					if (allowedVehicles.includes(priceInfo.display_name)) {
						allowedVehicles.splice(allowedVehicles.indexOf(priceInfo.display_name), 1);
						let priceHtml = `<div id=${priceInfo.display_name.replace(" ", "")} class="price-container">
								<div class="vehicle-type">${priceInfo.display_name}</div>
								<div class="vehicle-price">${priceInfo.estimate}</div>
								<div class="vehicle-eta"></div>
							</div>`;
						priceFinalHtml += priceHtml;
					}
				});
				this.priceDetailSelector.innerHTML = priceFinalHtml;
				this.getVehicleEta();
			});
	}

	getVehicleEta() {
		fetch(this.getAttribute("vehicle-eta-endpoint"))
			.then((data) => data.json())
			.then((data) => {
				let allowedVehicles = ["Auto GGN", "Pool", "MOTO", "UberGo"];
				data.times.forEach((timeInfo) => {
					if (allowedVehicles.includes(timeInfo.display_name)) {
						allowedVehicles.splice(allowedVehicles.indexOf(timeInfo.display_name), 1);
						let vehicleEtaElement = this.shadowRoot.querySelector(
							`#${timeInfo.display_name.replace(" ", "")} .vehicle-eta`
						);
						vehicleEtaElement.innerHTML = `${timeInfo.estimate / 60} m`;
					}
				});
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
			<div id="priceDetails"></div>
		</div>
	</div>
`;
