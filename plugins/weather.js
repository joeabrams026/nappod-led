//requires
var parseString = require('xml2js').parseString;
var request = require('request');
var screen = require('../screen.js');
var text = require('../text.js');

//vars
var isActive = false;
var temp;
var condition;

//config
var woeid = 12596838; //Berlin, Germany. Lookup: http://woeid.rosselliot.co.nz/
var unit = 'c'; //f: Fahrenheit, c: Celsius

//load weather
function loadWeather() {
	//make url
	var url = 'http://weather.yahooapis.com/forecastrss?w=' + woeid 
		+ '&u=' + unit;
	
	//make request, API: https://developer.yahoo.com/weather/
	request(url, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			//parse XML response
			parseString(body, function (err, result) {
				var weather = 
					result.rss.channel[0].item[0]['yweather:condition'][0]['$'];
				temp = weather.temp;
				condition = weather.code;
				update();
			});
		}
	})
}
loadWeather();

//reload weather every 5 minutes, regardless if active or not
setInterval(loadWeather, 5 * 60 * 1000);

//update
function update() {
	//is active?
	if(!isActive) {
		return;
	}
	
	//update screen
	screen.clear();
	var string;
	if(temp == undefined) {
		string = '...';
	} else {
		string = temp + '°';
	}
	text.addText(screen, string, 0);
	board.update(screen);
}

//start
function start() {
	isActive = true;
	update();
}
exports.start = start;

//stop
function stop() {
	isActive = false;
}
exports.stop = stop;

//set board
function setBoard(_board) {
	board = _board;
	screen.init(board.sizeX, board.sizeY);
}
exports.setBoard = setBoard;