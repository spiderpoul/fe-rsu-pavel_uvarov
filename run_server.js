var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.sendfile('libary.html');
});

app.use(express.static(__dirname));

var port = 8080;

app.listen(port);

console.log('Сервер стартовал на http://localhost:'+port);