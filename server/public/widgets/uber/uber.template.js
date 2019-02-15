class UberComponent extends HTMLElement {
	constructor() {
		super();

		this.allowedVehicles = ["Auto GGN", "Pool", "MOTO", "UberGo"];
		this.hireGoIncluded = false;

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(uberTemplate.content.cloneNode(true));
		this.distanceSelector = this.shadowRoot.querySelector("#distance");
		this.priceDetailSelector = this.shadowRoot.querySelector("#priceDetails");
	}

	connectedCallback() {
		fetch(this.getAttribute("price-endpoint"))
			.then((data) => data.json())
			.then((data) => {
				let distanceInKm = (data.prices[0].distance * 1.609).toFixed(2);
				this.distanceSelector.innerHTML = `Distance: ${distanceInKm} Km`;

				let priceFinalHtml = "";
				data.prices.forEach((priceInfo) => {
					if (this.allowedVehicles.includes(priceInfo.display_name)) {
						this.allowedVehicles.splice(this.allowedVehicles.indexOf(priceInfo.display_name), 1);
						let priceHtml = `<div class="price-container">
								<div class="vehicle-type">${priceInfo.display_name}</div>
								<div class="vehicle-price">${priceInfo.estimate}</div>
							</div>`;
						priceFinalHtml += priceHtml;
					}
				});
				this.priceDetailSelector.innerHTML = priceFinalHtml;
			});
		console.log(this.getAttribute("vehicle-eta-endpoint"));
		fetch(this.getAttribute("vehicle-eta-endpoint"))
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
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
		#uberContainer #uberHeader {
			
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
		#uberContainer #uberDetails {
			margin-top: 20px;
			width: 330px;
		}	
		#uberContainer #priceDetails {
			display: flex;
			justify-content: space-between;
			margin-top: 20px;
		}
		#uberContainer #priceDetails .price-container {
			
		}
	</style>
	<div id="uberContainer">
		<div id="uberHeader">
			<span class="fab fa-uber"></span>
			<span class="uber-label">Uber</span>
		</div>
		<div id="uberDetails">
			<div id="distance"></div>
			<div id="priceDetails"></div>
		</div>
	</div>
`;
