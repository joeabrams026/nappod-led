var font = require('./font.js').font;
var board = require('./board.js');

//add a text to given led array. If align is 0, the text will be centered, 1 
//	means aligned left, -1 means aligned right. If the align is more than 1 or 
//	less than -1, additional padding will be added to the aligned text
function addText(screen, string, align) {
	//split string
	if(!string.length) {
		return;
	}
	var strAry = string.split('');
	
	//get offset
	var size = getSize(strAry);
	var offset;
	if(align == 0) {
		offset = Math.round((board.sizeX - size) / 2);
	} else if(align > 0) {
		offset = align - 1;
	} else if(align < 0) {
		offset = board.sizeX - size + (align + 1);
	}
	
	//set text
	setText(screen, strAry, offset);
}

function setText(screen, strAry, offset) {
	for(var i = 0; i < strAry.length; i++) {
		//get font bytes
		var c = strAry[i];
		var charBytes = font[c];
		if(charBytes == undefined) {
			continue;
		}
	
		//set columns
		for(var x = 0; x < charBytes.length; x++) {
			var realX = offset + x;
			screen.setX(realX, charBytes[x]);
		}
		offset+= charBytes.length + 1;
	}
}

function getSize(strAry) {
	var size = 0;
	for(var i = 0; i < strAry.length; i++) {
		var c = strAry[i];
		if(font[c] != undefined) {
			size += font[c].length + 1;
		}
	}
	size = Math.max(0, size - 1);
	return size;
}

//exports
exports.addText = addText;