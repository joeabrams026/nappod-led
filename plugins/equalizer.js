//vars
var screen = require('../screen.js');
var interval;

//tick
function tick() {
	screen.clear();
	for(var x = 0; x < board.sizeX; x++) {
		var height = Math.floor(Math.random() * (board.sizeY - 1)) + 1;
		for(var y = 0; y < height; y++) {
			screen.set(x, board.sizeY - 1 - y, 1);
		}
	}
	board.update(screen);
}

//start
function start() {
	tick();
	interval = setInterval(tick, 70);
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

