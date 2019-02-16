const request = require("request-promise-native");
let config = require("./config");
let tokens = require("@tokens")[config.widgetName];

/**
 * Get access token from uber using refresh token
 */
exports.getAccessToken = async () => {
	let url = `${config.tokenApi}`;
	let options = {
		form: {
			client_secret: tokens.clientSecret,
			client_id: tokens.clientId,
			grant_type: "refresh_token",
			refresh_token: tokens.refreshToken
		}
	};
	let tokenResponse = await request.post(url, options);
	return JSON.parse(tokenResponse)["access_token"];
};

/**
 * Get list of products offered in home location
 */
exports.getProducts = async (accessToken) => {
	let url = `${config.productApi}?latitude=${tokens.homeLatitude}&longitude=${tokens.homeLongitude}`;
	options = {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	};

	let products = await request.get(url, options);
	products = JSON.parse(products);

	let filteredProductInfo = [];
	products["products"].forEach((product) => {
		if (config.widgetConfig.allowedVehicles.includes(product.display_name)) {
			filteredProductInfo.push(product);
		}
	});
	return filteredProductInfo;
};

/**
 * get detailes of ride for each product Ids
 */
exports.getEstimatesForProducts = async (productIds, accessToken) => {
	let estimateRequests = [];
	productIds.forEach((productId) => {
		let url = `${config.requestEstimateApi}`;
		let options = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json"
			},
			json: {
				start_latitude: tokens.homeLatitude,
				start_longitude: tokens.homeLongitude,
				end_latitude: tokens.officeLatitude,
				end_longitude: tokens.officeLongitude,
				product_id: productId
			}
		};
		estimateRequests.push(request.post(url, options));
	});
	return await Promise.all(estimateRequests);
};
