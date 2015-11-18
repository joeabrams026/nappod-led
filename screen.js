//vars
var screen;
var sizeY;

//init, with size in columns
function init(sizeX, sizeY) {
	screen = new Array(sizeX);
	clear();
}

//clear screen
function clear() {
	for(var i = 0; i < screen.length; i++) {
		screen[i] = 0x00;
	}
}

//set pixel
function set(x, y, val) {
	//bounds check
	if(!boundsValid(x, y)) {
		//fail silently
		return;
	}
	
	//set bit
	if(val) {
		screen[x] |= 1 << y;
	} else {
		screen[x] &= ~(1 << y);
	}
}

//get pixel
function get(x, y) {
	//bounds check
	if(!boundsValid(x, y)) {
		return false;
	}
	
	//get bit
	return screen[x] & (1 << y);
}

//set column
function setX(x, val) {
	//bounds check
	if(x < 0 || x > screen.length - 1) {
		//fail silently
		return;
	}
	
	//set column
	screen[x] = val;
}

//check bounds
function boundsValid(x, y) {
	if(x < 0 || x > screen.length - 1 || y < 0 || y > sizeY - 1) {
		return false;
	}
	return true;
}

//exports
exports.init = init;
exports.clear = clear;
exports.set = set;
exports.get = get;
exports.setX = setX;