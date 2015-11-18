var express = require('express');
var app = express();
var countdown = require('./plugins/countdown');

console.log('test');

app.get('/start', function (req, res) {
    console.log('starting countdown');
    countdown.start();
});

app.get('/stop', function (req, res) {
    console.log('stopping countdown');
    countdown.stop();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

//init board
var board = require('./board.js');
board.connect();
countdown.setBoard(board);

