var request = require("request");
const tokens = require("@tokens");
const config = require("./config.json");

/**
 * get uber price from home to office location
 */
exports.getUberPrice = (req, res) => {
	let tokenConfig = tokens[config.widgetName];
	let url = `${config.priceEstimateApi}?start_latitude=${tokenConfig.homeLatitude}&start_longitude=${
		tokenConfig.homeLongitude
	}&end_latitude=${tokenConfig.officeLatitude}&end_longitude=${tokenConfig.officeLongitude}`;
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
