var text = require('../text.js');
var sprintf = require('sprintf-js').sprintf;

//vars
var screen = require('../screen.js');
var interval;
var displayInterval;
var displayCount = 0;
var showColon;
var cur = 0;
var totalSeconds = 0;
var tickCount = 0;
var blinkPercentStart = 20;

//tick
function tick() {
	var percentDone = (cur/totalSeconds)*100;
	screen.clear();
	tickCount++;
	if( percentDone <  blinkPercentStart  && tickCount % 2 == 0 ){
		board.update(screen);
	}else{
		var colon = showColon ? ':' : ' ';
		var minutes = cur / 60;
		var seconds = cur % 60;
		var time = new Date(0,0,0,0,minutes, seconds);
		if(tickCount % 2 == 1)
			cur = cur - 1;
		var timeStr = sprintf('%02d%s%02d', time.getMinutes(), colon, time.getSeconds());
		//console.log(timeStr);
		text.addText(screen, timeStr, 0);
		board.update(screen);
		showColon = !showColon;
	}
	if(cur == 0){
		stop();
	}
}

//start
function start(minutes) {
	console.log('start('+minutes+')');
	tickCount = 0;
	totalSeconds = minutes * 60;
	cur = minutes * 60;
	showColon = true;
	clearInterval(displayInterval);
	clearInterval(interval);
	tick();
	interval = setInterval(tick, 500);
}
exports.start = start;

//stop
function stop() {
	console.log('stop()');
	cur = 0;
	clearInterval(interval);
	clearInterval(displayInterval);
	displayNapPod();
}
exports.stop = stop;

function displayTic(){
	displayCount++;
	if(displayCount % 2 == 0)
		displayText = 'Nap';
	else
		displayText = 'Pod';
	screen.clear();
	text.addText(screen, displayText, 0);
	board.update(screen)
}

function displayNapPod(){
	displayCount = 0;
	displayTic();
	displayInterval = setInterval(displayTic, 1000);
}

//set board
function setBoard(_board) {
	board = _board;
	screen.init(board.sizeX, board.sizeY);
}
exports.setBoard = setBoard;
