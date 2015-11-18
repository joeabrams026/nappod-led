var express = require('express');
var app = express();
var countdown = require('./plugins/countdown');

app.get('/start', function (req, res) {
    console.log('starting countdown');
    countdown.start();
    res.send('Sent start signal');
});

app.get('/stop', function (req, res) {
    console.log('stopping countdown');
    countdown.stop();
    res.send('Sent stop signal');
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

