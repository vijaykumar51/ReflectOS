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
	return JSON.parse(products);
};
