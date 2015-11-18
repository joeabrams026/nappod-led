var HID = require('node-hid');

//const
var SIZE_X = 21;
var SIZE_Y = 7;
var connectInterval = null;

//connect to message board
var board;
function connect() {
	var controllers = HID.devices(0x1d34, 0x0013);
	if(controllers.length) {
    	board = new HID.HID(controllers[0].path);
    	if(connectInterval) {
			clearInterval(connectInterval);
			connectInterval = null;
		}
		console.log("Connected.");
    }
}

//update board
var packetBytes = [];
function update(screen) {
	//set bits for each row
	var rowBytes = [];
	for(var y = 0; y < SIZE_Y; y++) {
		var bytes = [0xFF, 0xFF, 0xFF];
		var bytep = 2;
		var bitp = 0;
		for(var x = 0; x < SIZE_X; x++) {
			if(screen.get(x, y)) {
				bytes[bytep] &= ~(1 << bitp);
			}
			
			if(++bitp > 7) {
				bitp = 0;
				bytep--;
			}
		}
		rowBytes.push(bytes);
	}

	//make bytes that will be written to device
	packetBytes.length = 0;
	for(var i = 0; i < SIZE_Y; i += 2) {
		var row1 = rowBytes[i];
		var row2 = i != 6 ? rowBytes[i+1] : [0x00, 0x00, 0x00];
		var bytes = [0x01, i, row1[0], row1[1], row1[2], row2[0], row2[1], row2[2]];
		packetBytes.push(bytes);
	}
	refresh();
}

//keep this loop running for always displaying the last display state, otherwise 
//	the screen would be flushed after ~0.4 seconds.
setInterval(function() {
	refresh();
}, 200);

//refresh board
function refresh() {
	for(var i = 0; i < packetBytes.length; i++) {
		try {
			board.write(packetBytes[i]);
		} catch(e) {
			if(!connectInterval) {
				console.log("Disconnected.");
				connectInterval = setInterval(connect, 1000);
			}
		}
	}
}

//returns an empty led array
function createLedArray() {
	var ary = new Array(SIZE_X);
	for(var i = 0; i < SIZE_X; i++) {
		ary[i] = new Array(SIZE_Y);
	}
	return ary;
}

//cleans a led array
function cleanLedArray(ledAry) {
	for(var x = 0; x < SIZE_X; x++) {
		for(var y = 0; y < SIZE_Y; y++) {
			ledAry[x][y] = 0;
		}
	}
}

//exports
exports.connect = connect;
exports.update = update;
exports.createLedArray = createLedArray;
exports.cleanLedArray = cleanLedArray;
exports.sizeX = SIZE_X;
exports.sizeY = SIZE_Y;