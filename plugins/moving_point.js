//vars
var screen = require('../screen.js');
var interval;
var x = 0, y = 0;

//tick
function tick() {
	screen.clear();
	if(y == 0) {
		if(x == board.sizeX - 1) {
			y++;
		} else {
			x++;
		}
	} else if(x == 0) {
		y--;
	} else if (x == board.sizeX - 1) {
		if(y == board.sizeY - 1) {
			x--;
		} else {
			y++;
		}
	} else if(y == board.sizeY - 1) {
		x--;
	}
	screen.set(x, y, 1);
	board.update(screen);
}

//start
function start() {
	tick();
	interval = setInterval(tick, 10);
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