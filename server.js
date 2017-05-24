let express = require('express');
let multer = require('multer');
let books = require('./books');
let bodyParser = require('body-parser');
let app = express();
const port = 8080;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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

app.get('/getBooks', function(req, res) {
  let allBooks = books.getBooks();
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(allBooks);
});

app.post('/addNewBook', function(req, res) {
  console.log(req.body);
  let newBook = books.addNewBook(req.body.bookTitle, req.body.bookAuthor, req.body.bookCover)
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  console.log("New book " + newBook);
  //let allBooks = books.getBooks();
  res.send(newBook);
  res.end(newBook);
});

app.post('/setRating', function(req, res) {
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
app.listen(port);



console.log('Сервер стартовал на http://localhost:'+port);