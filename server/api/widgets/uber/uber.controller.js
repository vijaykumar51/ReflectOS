var request = require("request");
const tokens = require("@tokens");
const config = require("./config.json");
let uberApiService = require("./uber-api.service");

/**
 * get uber price from home to office location
 */
exports.getUberPrice = (req, res) => {
	let tokenConfig = tokens[config.widgetName];
	let url = `${config.priceEstimateApi}?start_latitude=${tokenConfig.homeLatitude}&start_longitude=${
		tokenConfig.homeLongitude
	}&end_latitude=${tokenConfig.officeLatitude}&end_longitude=${tokenConfig.officeLongitude}`;
	console.log(url);
	let options = {
		url: url,
		headers: {
			Authorization: `Token ${tokenConfig.serverToken}`
		}
	};
	request.get(options, (err, response, body) => {
		if (err) {
			res.json(err);
		}
		res.json(JSON.parse(body));
	});
};

/**
 * get the eta of nearest vehicles to the home location
 */
exports.getVehicleETA = (req, res) => {
	let tokenConfig = tokens[config.widgetName];
	let url = `${config.vechicleEtaApi}?start_latitude=${tokenConfig.homeLatitude}&start_longitude=${
		tokenConfig.homeLongitude
	}`;
	let options = {
		url: url,
		headers: {
			Authorization: `Token ${tokenConfig.serverToken}`
		}
	};
	request.get(options, (err, response, body) => {
		if (err) {
			res.json(err);
		}
		res.json(JSON.parse(body));
	});
};

exports.getProducts = async (req, res) => {
	let token = await uberApiService.getAccessToken();
	let products = await uberApiService.getProducts(token);

	res.json(filteredProductInfo);
};

exports.getEstimates = async (req, res) => {
	let productIds = [];
	let productDisplayNames = [];
	let token = await uberApiService.getAccessToken();
	if (req.query.productId) {
		productIds.push(req.query.productId);
	} else {
		let products = await uberApiService.getProducts(token);

		products.forEach((product) => {
			productIds.push(product.product_id);
			productDisplayNames.push(product.display_name);
		});
	}

	let estimates = await uberApiService.getEstimatesForProducts(productIds, token);
	let finalEstimatedResults = {};
	productDisplayNames.forEach((displayName, index) => {
		finalEstimatedResults[displayName] = estimates[index];
	});
	res.json(finalEstimatedResults);
};
