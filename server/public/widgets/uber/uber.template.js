class UberComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(uberTemplate.content.cloneNode(true));
		this.distanceSelector = this.shadowRoot.querySelector("#distance");
		this.priceDetailSelector = this.shadowRoot.querySelector("#priceDetails");
	}

	connectedCallback() {
		console.log("uber widget connected");
		console.log(this["price-endpoint"]);
		fetch(this["price-endpoint"])
			.then((data) => data.json())
			.then((data) => {
				let distanceInKm = data.prices[0].distance * 1.609;

				this.dispatchEvent.innerHTML(`Distance: ${distanceInKm} Km`);
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
