//requires
var screen = require('../screen.js');
var text = require('../text.js');
var sprintf = require('sprintf-js').sprintf;

//vars
var isActive = false;
var price;

//connect to websocket
var WebSocket = require('ws')
var ws = new WebSocket('ws://ws.pusherapp.com:80/app/de504dc5763aeef9ff52?client=js&version=2.2&protocol=5');
ws.on('open', function() {
	//subscribe to channel
	var json = JSON.stringify({
		'event': 'pusher:subscribe', 
		'data': {
			'channel': 'live_trades', 
			'auth': null, 
			'channel_data': {}
		}
	});
	ws.send(json);
});
ws.on('message', function(message) {
	var obj = JSON.parse(message);
	var data = JSON.parse(obj.data);
	if(data.price != undefined) {
		price = sprintf('%.1f', data.price);
		update();
	}
});

//update
function update() {
	//is active?
	if(!isActive) {
		return;
	}
	
	//update screen
	screen.clear();
	var string;
	if(price == undefined) {
		string = '...';
	} else {
		string = price;
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