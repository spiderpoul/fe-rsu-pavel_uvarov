const books = [];
const imagePath = "img/";
let booksData = require('./booksData.json');

createBooks(booksData);

// Book constructor
function Book(id, title, author, rating, image) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.image = image;
    this.tags = [];
}

// Add new book
 function addNewBook(bookTitle, bookAuthor, bookCover) {
    books.push(new Book(books.length, bookTitle, bookAuthor, -1, imagePath + bookCover));
    console.log(books[books.length - 1]);
    return JSON.stringify(books[books.length - 1]);
};

// Set new rating
function setRating(bookId, rating) {
    if (rating > -2) {
        books[bookId].rating = rating;
    }
    return JSON.stringify(books[bookId]);
};

// Create books from JSON dataset
function createBooks(booksData) {
    let i = 0;
    for (i; i < booksData.length; i += 1) {
        let title = booksData[i].title;
        let author = booksData[i].author;
        let rating = booksData[i].rating;
        let image = imagePath + booksData[i].image;
        let bookTags = booksData[i].tags.split(",");
        bookTags = uniqueArray(bookTags);

        books[i] = new Book(i, title, author, rating, image);
        books[i].tags = bookTags;        

        //allBooksTags.addTag(bookTags);        
    }
    return books;
};

// Return unique array of elements
function uniqueArray(arr) {
    const obj = {};
    let i = 0;

    for (i; i < arr.length; i += 1) {
        let item = arr[i].trim();
        obj[item] = true;
    }

    return Object.keys(obj);
}

//Get books
function getBooks() {
    return JSON.stringify(books);
}

exports.getBooks = getBooks;
exports.addNewBook = addNewBook;
exports.setRating = setRating;