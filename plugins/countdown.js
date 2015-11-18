var text = require('../text.js');
var sprintf = require('sprintf-js').sprintf;

//vars
var screen = require('../screen.js');
var interval;
var showColon;
var cur = 0;

//tick
function tick() {
	screen.clear();
	var colon = showColon ? ':' : ' ';
	var minutes = cur / 60;
	var seconds = cur % 60;
	var time = new Date(0,0,0,0,minutes, seconds);
	cur = cur - 1;
	var timeStr = sprintf('%02d%s%02d', time.getMinutes(), colon, time.getSeconds());
    console.log(timeStr);
	text.addText(screen, timeStr, 0);
	board.update(screen);
	showColon = !showColon;
}

//start
function start() {
	cur = 15 * 60;
	showColon = true;
	tick();
	interval = setInterval(tick, 1000);
}
exports.start = start;

//stop
function stop() {
	clearInterval(interval);
}
exports.stop = stop;

//set board
function setBoard(_board) {
	board = _board;
	screen.init(board.sizeX, board.sizeY);
}
exports.setBoard = setBoard;
