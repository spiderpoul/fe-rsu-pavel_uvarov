const http = require('http');
const express = require('express');
const multer = require('multer');
const books = require('./books');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
var io = require('socket.io').listen(server);
const port = 8080;

app.set('port', (process.env.PORT || port));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendfile('libary.html');
});

const storage = multer.diskStorage({
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

app.get('/getBooks', (req, res) => {
  let allBooks = books.getBooks();
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(allBooks);
});

app.post('/addNewBook', (req, res) => {
  console.log(req.body);
  let newBook = books.addNewBook(req.body.bookTitle, req.body.bookAuthor, req.body.bookCover)
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  console.log("New book " + newBook);
  res.send(newBook);
  res.end(newBook);
});

app.post('/setRating', (req, res) => {
  console.log(req.body);  
  const data = req.body;  
  let allBooks;
  books.setRating(data.bookId, data.rating);
  allBooks = books.getBooks();
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(allBooks);
});

app.use(express.static(__dirname));

server.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('hideNotificationRequest', notificationId => {
    console.log(notificationId);
    setTimeout(() => io.emit('allowHideNotification', notificationId), 3000);
  });  
  socket.on('disconnect', () => console.log('Client disconnected'));
});