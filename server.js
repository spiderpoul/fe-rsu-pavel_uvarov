var express = require('express');
var multer = require('multer');
var app = express();
var port = 8080;

app.get('/', function(req, res) {
  res.sendfile('libary.html');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //'-' + Date.now() + 
  }
});

app.post('/upload', multer({ storage: storage }).single('bookCover'), function(req,res){
	console.log(req.body); //form fields
	console.log(req.file); //form files
	res.status(200).end();
});


app.use(express.static(__dirname));
app.listen(port);

console.log('Сервер стартовал на http://localhost:'+port);