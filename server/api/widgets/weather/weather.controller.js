const request = require("request");
const tokens = require("@tokens");
const config = require("./config.json");

exports.getWeatherInfo = (req, res) => {
	let token = tokens[config.widgetName];
	let currentWeatherApiUrl = `${config.currentWeatherApiUrl}?q=${config.widgetConfig.city},${
		config.widgetConfig.countryCode
	}&units=${config.widgetConfig.units}&appid=${token}`;

	// request.get(currentWeatherApiUrl, (error, response, body) => {
	// 	if (error) {
	// 		console.log("error", error);
	// 		res.send(error);
	// 	}
	// 	res.json(JSON.parse(body));
	// });
	res.json(todayWeather);
};

exports.getWeatherForecast = (req, res) => {
	return res.json(forecast);
};

let todayWeather = {
	coord: {
		lon: 77.03,
		lat: 28.46
	},
	weather: [
		{
			id: 701,
			main: "Mist",
			description: "mist",
			icon: "50n"
		}
	],
	base: "stations",
	main: {
		temp: 11,
		pressure: 1015,
		humidity: 100,
		temp_min: 11,
		temp_max: 11
	},
	visibility: 2200,
	wind: {
		speed: 1.46,
		deg: 261.502
	},
	clouds: {
		all: 20
	},
	dt: 1549571400,
	sys: {
		type: 1,
		id: 9165,
		message: 0.0056,
		country: "IN",
		sunrise: 1549503350,
		sunset: 1549542994
	},
	id: 1270642,
	name: "Gurugram",
	cod: 200
};

let forecast = {
	cod: "200",
	message: 0.0112,
	cnt: 40,
	list: [
		{
			dt: 1549584000,
			main: {
				temp: 5.68,
				temp_min: 4.29,
				temp_max: 5.68,
				pressure: 999.64,
				sea_level: 1029.62,
				grnd_level: 999.64,
				humidity: 83,
				temp_kf: 1.39
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 0.96,
				deg: 14.501
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-08 00:00:00"
		},
		{
			dt: 1549594800,
			main: {
				temp: 9.02,
				temp_min: 8.09,
				temp_max: 9.02,
				pressure: 1001.58,
				sea_level: 1031.53,
				grnd_level: 1001.58,
				humidity: 78,
				temp_kf: 0.93
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 1.31,
				deg: 66.5002
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-08 03:00:00"
		},
		{
			dt: 1549605600,
			main: {
				temp: 17.08,
				temp_min: 16.61,
				temp_max: 17.08,
				pressure: 1002.58,
				sea_level: 1031.92,
				grnd_level: 1002.58,
				humidity: 100,
				temp_kf: 0.46
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 2.07,
				deg: 82.0022
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-08 06:00:00"
		},
		{
			dt: 1549616400,
			main: {
				temp: 18.47,
				temp_min: 18.47,
				temp_max: 18.47,
				pressure: 1000.58,
				sea_level: 1029.76,
				grnd_level: 1000.58,
				humidity: 74,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 1.91,
				deg: 36.0002
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-08 09:00:00"
		},
		{
			dt: 1549627200,
			main: {
				temp: 17.09,
				temp_min: 17.09,
				temp_max: 17.09,
				pressure: 999.92,
				sea_level: 1029.09,
				grnd_level: 999.92,
				humidity: 55,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "02d"
				}
			],
			clouds: {
				all: 8
			},
			wind: {
				speed: 1.26,
				deg: 358.004
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-08 12:00:00"
		},
		{
			dt: 1549638000,
			main: {
				temp: 10.58,
				temp_min: 10.58,
				temp_max: 10.58,
				pressure: 1001.35,
				sea_level: 1031.07,
				grnd_level: 1001.35,
				humidity: 66,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 3.21,
				deg: 351.01
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-08 15:00:00"
		},
		{
			dt: 1549648800,
			main: {
				temp: 8.18,
				temp_min: 8.18,
				temp_max: 8.18,
				pressure: 1002.19,
				sea_level: 1032.25,
				grnd_level: 1002.19,
				humidity: 88,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 2.91,
				deg: 341.001
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-08 18:00:00"
		},
		{
			dt: 1549659600,
			main: {
				temp: 6.56,
				temp_min: 6.56,
				temp_max: 6.56,
				pressure: 1001.72,
				sea_level: 1031.95,
				grnd_level: 1001.72,
				humidity: 87,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 3.12,
				deg: 316.5
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-08 21:00:00"
		},
		{
			dt: 1549670400,
			main: {
				temp: 6.02,
				temp_min: 6.02,
				temp_max: 6.02,
				pressure: 1001.69,
				sea_level: 1031.98,
				grnd_level: 1001.69,
				humidity: 90,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 3.66,
				deg: 301.008
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-09 00:00:00"
		},
		{
			dt: 1549681200,
			main: {
				temp: 8.24,
				temp_min: 8.24,
				temp_max: 8.24,
				pressure: 1003.52,
				sea_level: 1033.79,
				grnd_level: 1003.52,
				humidity: 82,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 4.92,
				deg: 295.5
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-09 03:00:00"
		},
		{
			dt: 1549692000,
			main: {
				temp: 17.11,
				temp_min: 17.11,
				temp_max: 17.11,
				pressure: 1004.11,
				sea_level: 1033.56,
				grnd_level: 1004.11,
				humidity: 68,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 4.36,
				deg: 320.502
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-09 06:00:00"
		},
		{
			dt: 1549702800,
			main: {
				temp: 19.45,
				temp_min: 19.45,
				temp_max: 19.45,
				pressure: 1002.21,
				sea_level: 1031.42,
				grnd_level: 1002.21,
				humidity: 51,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 5.46,
				deg: 323.502
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-09 09:00:00"
		},
		{
			dt: 1549713600,
			main: {
				temp: 17.99,
				temp_min: 17.99,
				temp_max: 17.99,
				pressure: 1001.79,
				sea_level: 1031.13,
				grnd_level: 1001.79,
				humidity: 38,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d"
				}
			],
			clouds: {
				all: 48
			},
			wind: {
				speed: 3.92,
				deg: 321.001
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-09 12:00:00"
		},
		{
			dt: 1549724400,
			main: {
				temp: 12.31,
				temp_min: 12.31,
				temp_max: 12.31,
				pressure: 1003.1,
				sea_level: 1033.01,
				grnd_level: 1003.1,
				humidity: 53,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03n"
				}
			],
			clouds: {
				all: 48
			},
			wind: {
				speed: 3.36,
				deg: 316.501
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-09 15:00:00"
		},
		{
			dt: 1549735200,
			main: {
				temp: 7.63,
				temp_min: 7.63,
				temp_max: 7.63,
				pressure: 1003.64,
				sea_level: 1033.86,
				grnd_level: 1003.64,
				humidity: 84,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 3.12,
				deg: 304.004
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-09 18:00:00"
		},
		{
			dt: 1549746000,
			main: {
				temp: 4.77,
				temp_min: 4.77,
				temp_max: 4.77,
				pressure: 1003.33,
				sea_level: 1033.71,
				grnd_level: 1003.33,
				humidity: 84,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 2.77,
				deg: 301.501
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-09 21:00:00"
		},
		{
			dt: 1549756800,
			main: {
				temp: 3.94,
				temp_min: 3.94,
				temp_max: 3.94,
				pressure: 1003.05,
				sea_level: 1033.55,
				grnd_level: 1003.05,
				humidity: 93,
				temp_kf: 0
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02n"
				}
			],
			clouds: {
				all: 12
			},
			wind: {
				speed: 1.96,
				deg: 293.001
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-10 00:00:00"
		},
		{
			dt: 1549767600,
			main: {
				temp: 6.58,
				temp_min: 6.58,
				temp_max: 6.58,
				pressure: 1004.54,
				sea_level: 1034.87,
				grnd_level: 1004.54,
				humidity: 86,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d"
				}
			],
			clouds: {
				all: 32
			},
			wind: {
				speed: 1.37,
				deg: 265.5
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-10 03:00:00"
		},
		{
			dt: 1549778400,
			main: {
				temp: 17.01,
				temp_min: 17.01,
				temp_max: 17.01,
				pressure: 1005.24,
				sea_level: 1034.76,
				grnd_level: 1005.24,
				humidity: 64,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d"
				}
			],
			clouds: {
				all: 32
			},
			wind: {
				speed: 2.06,
				deg: 292.5
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-10 06:00:00"
		},
		{
			dt: 1549789200,
			main: {
				temp: 19.78,
				temp_min: 19.78,
				temp_max: 19.78,
				pressure: 1002.99,
				sea_level: 1032.19,
				grnd_level: 1002.99,
				humidity: 50,
				temp_kf: 0
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04d"
				}
			],
			clouds: {
				all: 64
			},
			wind: {
				speed: 2.01,
				deg: 317
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-10 09:00:00"
		},
		{
			dt: 1549800000,
			main: {
				temp: 18.94,
				temp_min: 18.94,
				temp_max: 18.94,
				pressure: 1002.32,
				sea_level: 1031.7,
				grnd_level: 1002.32,
				humidity: 37,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d"
				}
			],
			clouds: {
				all: 48
			},
			wind: {
				speed: 1.36,
				deg: 8.0011
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-10 12:00:00"
		},
		{
			dt: 1549810800,
			main: {
				temp: 11.86,
				temp_min: 11.86,
				temp_max: 11.86,
				pressure: 1003.86,
				sea_level: 1033.74,
				grnd_level: 1003.86,
				humidity: 63,
				temp_kf: 0
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04n"
				}
			],
			clouds: {
				all: 64
			},
			wind: {
				speed: 2.92,
				deg: 29.5017
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-10 15:00:00"
		},
		{
			dt: 1549821600,
			main: {
				temp: 9.17,
				temp_min: 9.17,
				temp_max: 9.17,
				pressure: 1004.29,
				sea_level: 1034.37,
				grnd_level: 1004.29,
				humidity: 83,
				temp_kf: 0
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02n"
				}
			],
			clouds: {
				all: 24
			},
			wind: {
				speed: 2.7,
				deg: 57.5061
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-10 18:00:00"
		},
		{
			dt: 1549832400,
			main: {
				temp: 5.63,
				temp_min: 5.63,
				temp_max: 5.63,
				pressure: 1004.14,
				sea_level: 1034.43,
				grnd_level: 1004.14,
				humidity: 88,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 1.27,
				deg: 58.5029
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-10 21:00:00"
		},
		{
			dt: 1549843200,
			main: {
				temp: 4.03,
				temp_min: 4.03,
				temp_max: 4.03,
				pressure: 1003.77,
				sea_level: 1034.1,
				grnd_level: 1003.77,
				humidity: 85,
				temp_kf: 0
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02n"
				}
			],
			clouds: {
				all: 20
			},
			wind: {
				speed: 1.23,
				deg: 35.5
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-11 00:00:00"
		},
		{
			dt: 1549854000,
			main: {
				temp: 8.04,
				temp_min: 8.04,
				temp_max: 8.04,
				pressure: 1005.41,
				sea_level: 1035.56,
				grnd_level: 1005.41,
				humidity: 85,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d"
				}
			],
			clouds: {
				all: 36
			},
			wind: {
				speed: 1.27,
				deg: 59.5056
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-11 03:00:00"
		},
		{
			dt: 1549864800,
			main: {
				temp: 16.87,
				temp_min: 16.87,
				temp_max: 16.87,
				pressure: 1006.61,
				sea_level: 1036.01,
				grnd_level: 1006.61,
				humidity: 57,
				temp_kf: 0
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04d"
				}
			],
			clouds: {
				all: 76
			},
			wind: {
				speed: 2.06,
				deg: 126.501
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-11 06:00:00"
		},
		{
			dt: 1549875600,
			main: {
				temp: 19.54,
				temp_min: 19.54,
				temp_max: 19.54,
				pressure: 1004.4,
				sea_level: 1033.56,
				grnd_level: 1004.4,
				humidity: 49,
				temp_kf: 0
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04d"
				}
			],
			clouds: {
				all: 76
			},
			wind: {
				speed: 2.02,
				deg: 92.504
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-11 09:00:00"
		},
		{
			dt: 1549886400,
			main: {
				temp: 19.1,
				temp_min: 19.1,
				temp_max: 19.1,
				pressure: 1003.55,
				sea_level: 1032.82,
				grnd_level: 1003.55,
				humidity: 44,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d"
				}
			],
			clouds: {
				all: 44
			},
			wind: {
				speed: 2.41,
				deg: 64.5025
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-11 12:00:00"
		},
		{
			dt: 1549897200,
			main: {
				temp: 12.22,
				temp_min: 12.22,
				temp_max: 12.22,
				pressure: 1004.45,
				sea_level: 1034.2,
				grnd_level: 1004.45,
				humidity: 76,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03n"
				}
			],
			clouds: {
				all: 32
			},
			wind: {
				speed: 2.91,
				deg: 50.0107
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-11 15:00:00"
		},
		{
			dt: 1549908000,
			main: {
				temp: 8.22,
				temp_min: 8.22,
				temp_max: 8.22,
				pressure: 1004.78,
				sea_level: 1034.84,
				grnd_level: 1004.78,
				humidity: 88,
				temp_kf: 0
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04n"
				}
			],
			clouds: {
				all: 64
			},
			wind: {
				speed: 1.26,
				deg: 37.5015
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-11 18:00:00"
		},
		{
			dt: 1549918800,
			main: {
				temp: 6.6,
				temp_min: 6.6,
				temp_max: 6.6,
				pressure: 1004.09,
				sea_level: 1034.27,
				grnd_level: 1004.09,
				humidity: 87,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03n"
				}
			],
			clouds: {
				all: 32
			},
			wind: {
				speed: 0.52,
				deg: 217.001
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-11 21:00:00"
		},
		{
			dt: 1549929600,
			main: {
				temp: 6.07,
				temp_min: 6.07,
				temp_max: 6.07,
				pressure: 1003.46,
				sea_level: 1033.69,
				grnd_level: 1003.46,
				humidity: 87,
				temp_kf: 0
			},
			weather: [
				{
					id: 804,
					main: "Clouds",
					description: "overcast clouds",
					icon: "04n"
				}
			],
			clouds: {
				all: 88
			},
			wind: {
				speed: 1.24,
				deg: 330.5
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-12 00:00:00"
		},
		{
			dt: 1549940400,
			main: {
				temp: 9.39,
				temp_min: 9.39,
				temp_max: 9.39,
				pressure: 1005.28,
				sea_level: 1035.47,
				grnd_level: 1005.28,
				humidity: 88,
				temp_kf: 0
			},
			weather: [
				{
					id: 804,
					main: "Clouds",
					description: "overcast clouds",
					icon: "04d"
				}
			],
			clouds: {
				all: 92
			},
			wind: {
				speed: 1.3,
				deg: 345.503
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-12 03:00:00"
		},
		{
			dt: 1549951200,
			main: {
				temp: 17.26,
				temp_min: 17.26,
				temp_max: 17.26,
				pressure: 1006.26,
				sea_level: 1035.62,
				grnd_level: 1006.26,
				humidity: 61,
				temp_kf: 0
			},
			weather: [
				{
					id: 804,
					main: "Clouds",
					description: "overcast clouds",
					icon: "04d"
				}
			],
			clouds: {
				all: 92
			},
			wind: {
				speed: 2.01,
				deg: 53.0013
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-12 06:00:00"
		},
		{
			dt: 1549962000,
			main: {
				temp: 19.24,
				temp_min: 19.24,
				temp_max: 19.24,
				pressure: 1004.66,
				sea_level: 1033.73,
				grnd_level: 1004.66,
				humidity: 52,
				temp_kf: 0
			},
			weather: [
				{
					id: 804,
					main: "Clouds",
					description: "overcast clouds",
					icon: "04d"
				}
			],
			clouds: {
				all: 92
			},
			wind: {
				speed: 2.02,
				deg: 26.5
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-12 09:00:00"
		},
		{
			dt: 1549972800,
			main: {
				temp: 17.93,
				temp_min: 17.93,
				temp_max: 17.93,
				pressure: 1004.01,
				sea_level: 1033.14,
				grnd_level: 1004.01,
				humidity: 44,
				temp_kf: 0
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04d"
				}
			],
			clouds: {
				all: 80
			},
			wind: {
				speed: 1.42,
				deg: 51.5001
			},
			rain: {},
			sys: {
				pod: "d"
			},
			dt_txt: "2019-02-12 12:00:00"
		},
		{
			dt: 1549983600,
			main: {
				temp: 11.33,
				temp_min: 11.33,
				temp_max: 11.33,
				pressure: 1005.03,
				sea_level: 1034.75,
				grnd_level: 1005.03,
				humidity: 70,
				temp_kf: 0
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04n"
				}
			],
			clouds: {
				all: 56
			},
			wind: {
				speed: 1.67,
				deg: 74
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-12 15:00:00"
		},
		{
			dt: 1549994400,
			main: {
				temp: 8.48,
				temp_min: 8.48,
				temp_max: 8.48,
				pressure: 1005.77,
				sea_level: 1035.73,
				grnd_level: 1005.77,
				humidity: 85,
				temp_kf: 0
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03n"
				}
			],
			clouds: {
				all: 48
			},
			wind: {
				speed: 1.21,
				deg: 60.0007
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-12 18:00:00"
		},
		{
			dt: 1550005200,
			main: {
				temp: 5.5,
				temp_min: 5.5,
				temp_max: 5.5,
				pressure: 1005.46,
				sea_level: 1035.53,
				grnd_level: 1005.46,
				humidity: 85,
				temp_kf: 0
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n"
				}
			],
			clouds: {
				all: 0
			},
			wind: {
				speed: 0.97,
				deg: 30.5006
			},
			rain: {},
			sys: {
				pod: "n"
			},
			dt_txt: "2019-02-12 21:00:00"
		}
	],
	city: {
		id: 1270642,
		name: "Gurugram",
		coord: {
			lat: 28.4646,
			lon: 77.0299
		},
		country: "IN",
		population: 197340
	}
};
