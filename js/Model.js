function Model() {
    this.booksData = [];
    this.books = [];
    this.maxRating = 5;
    this.imagePath = "img/";
    this.booksDataFile = 'booksData.json';
    this.allHistory = [];
    this.historyActions = {
        "addNewBook": "add new book",
        "filter": "filter",
        "rating": "rating",
        "search": "search"
    };
    //Create default tags
    this.allBooksTags = new TagsClass(["Must Read Titles", "Best Of List", "Classic Novels", "Non Fiction"]);
}

// Create books from JSON dataset
Model.prototype.createBooks = function (booksData) {
    let i = 0;
    for (i; i < booksData.length; i += 1) {
        let title = booksData[i].title;
        let author = booksData[i].author;
        let rating = booksData[i].rating;
        let image = this.imagePath + booksData[i].image;
        let bookTags = booksData[i].tags.split(",");

        this.books[i] = new Book(i, title, author, rating, image);

        this.bookTags = uniqueArray(bookTags);

        this.allBooksTags.addTag(bookTags);

        this.books[i].setTags(bookTags);
    }
    return this.books;
};

// Load JSON file from server
Model.prototype.httpGetJson = function (url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        let jsonData = [];
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                jsonData = JSON.parse(xhr.responseText);
            }
        };

        xhr.onload = function () {
            if (this.status == 200) {
                console.log(jsonData);
                resolve(jsonData);
            }
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
};

// Tags class constructor
function TagsClass(defaultTags) {
    this.tags = defaultTags;
}

// Add new tag in tags list
TagsClass.prototype.addTag = function (newTags) {
    if (Array.isArray(newTags))
        Array.prototype.push.apply(this.tags, newTags);
    else
        this.tags.push(newTags);
    this.tags = uniqueArray(this.tags);
};

// Book constructor
function Book(id, title, author, rating, image) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.image = image;
    this.tags = [];
}

// Set tags
Book.prototype.setTags = function (arrTags) {
    this.tags = arrTags;
};

// Set tags
Book.prototype.getId = function (arrTags) {
    return this.id;
};

// Add new tag to a book
Model.prototype.addNewTagToBook = function (bookId, newTag) {
    if (newTag !== "") {
        this.books[bookId].tags.push(newTag);
        this.books[bookId].tags = uniqueArray(this.books[bookId].tags);
    }
};

// Remove tag from a book
Model.prototype.removeTagFromBook = function (bookId, removedTag) {
    const indexOfTag = this.books[bookId].tags.indexOf(removedTag);
    if (indexOfTag > -1) {
        this.books[bookId].tags.splice(indexOfTag, 1);
    }
};

// Get book's tags array by id
Model.prototype.getBookTags = function (bookId) {
    return this.books[bookId].tags;
};

// Is this book most popular
Model.prototype.isMostPopular = function (book) {
    return (book.rating == this.maxRating - 1);
};

// Search filter by title and author
Model.prototype.searchByFilter = function (book, filter) {
    return (book.title.toLowerCase().indexOf(filter) > -1 || book.author.toLowerCase().indexOf(filter) > -1);
};

// Get new rating and update
Model.prototype.getRating = function (bookId) {
    return this.books[bookId].rating;
};

// Set new rating and update
Model.prototype.setRating = function (bookId, rating) {
    if (rating > -2) {
        this.books[bookId].rating = rating;
    }
    console.log(this.books[bookId]);
};

// Add new book
Model.prototype.addNewBook = function (bookTitle, bookAuthor, bookCover) {
    const that = this;
    this.books.push(new Book(that.books.length, bookTitle, bookAuthor, -1, this.imagePath + bookCover));
    console.log(that.books[that.books.length - 1]);

    return this.books[that.books.length - 1];
};

// Get book object by id
Model.prototype.getBookById = function (bookId) {
    return this.books[bookId];
};

// Get name of the book by id
Model.prototype.getBookTitle = function (bookId) {
    return this.books[bookId].title;
};

// Get author of the book by id
Model.prototype.getBookAuthor = function (bookId) {
    return this.books[bookId].author;
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

// HISTORY

// History item consructor
function History() {
    this.dateAdd = new Date();
}

History.prototype.setBookId = function (bookId) {
    this.bookId = bookId;
};

History.prototype.setFilter = function (filterName) {
    this.filter = filterName;
};

History.prototype.setAction = function (action) {
    this.action = action;
};

History.prototype.getBookId = function () {
    return this.bookId;
};

History.prototype.getFilter = function () {
    return this.filter;
};

History.prototype.getAction = function () {
    return this.action;
};

History.prototype.getDateAdd = function () {
    let diff = new Date() - this.dateAdd;
    if (diff < 1000) {
        return "Right now";
    }

    let sec = Math.floor(diff / 1000);
    if (sec < 60) {
        if (sec == 1)
            return sec + " second ago";
        else
            return sec + " seconds ago";
    }

    let minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
        if (minutes == 1)
            return minutes + " minute ago";
        else
            return minutes + " minutes ago";
    }

    let d = this.dateAdd;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2));
    console.log(d);

    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
};

History.prototype.getAction = function () {
    return this.action;
};

// Add history mark add new book
Model.prototype.addHistoryAddBook = function (bookId) {
    const historyItem = new History();
    historyItem.setBookId(bookId);
    historyItem.setAction(this.historyActions.addNewBook);
    this.allHistory.unshift(historyItem);
};

// Add history mark when user used filter
Model.prototype.addHistoryFilter = function (filterName) {
    const historyItem = new History();
    historyItem.setFilter(filterName);
    historyItem.setAction(this.historyActions.filter);
    this.allHistory.unshift(historyItem);
};

// Add history mark when user used filter
Model.prototype.addHistorySearch = function (searchFilter) {
    const historyItem = new History();
    historyItem.setFilter(searchFilter);
    historyItem.setAction(this.historyActions.search);
    this.allHistory.unshift(historyItem);
};

// Add history mark when user changed rating
Model.prototype.addHistoryChangeRating = function (bookId) {
    const historyItem = new History();
    historyItem.setBookId(bookId);
    historyItem.setAction(this.historyActions.rating);
    this.allHistory.unshift(historyItem);
};
