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
        "rating": "rating"};
    //Create default tags
    this.allBooksTags = new TagsClass(["Must Read Titles","Best Of List","Classic Novels","Non Fiction"]);
    
}

Model.prototype.loadBooksData = function () {
    const that = this;    
    let xmlRequest = new XMLHttpRequest();
    let booksData = [];

    xmlRequest.onreadystatechange = function() {
        if(xmlRequest.readyState === 4) {
            let i=0;
            booksData = JSON.parse(xmlRequest.responseText); 
            for (i; i < booksData.length; i += 1) {              
                let title = booksData[i].title;
                let author = booksData[i].author;
                let rating = booksData[i].rating;
                let image = that.imagePath + booksData[i].image;                                    
                let bookTags = booksData[i].tags.split(",");                    

                that.books[i] = new Book(i, title, author, rating, image);

                that.bookTags = uniqueArray(bookTags);

                that.allBooksTags.addTag(bookTags);                                    

                that.books[i].setTags(bookTags);                            
            }                        
        };
    };
    
    xmlRequest.open("GET", this.booksDataFile, false);
    xmlRequest.send();   
    return that.books;
}

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
}

// Book constructor
function Book(id, title, author, rating, image){
    this.id = id;
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.image = image;
    this.tags = [];
}

// Set tags
Book.prototype.setTags = function(arrTags) {
    this.tags = arrTags;
}

// Set tags
Book.prototype.getId = function(arrTags) {
    return this.id;
}

// Add new tag to a book
Model.prototype.addNewTagToBook = function(bookId, newTag) {
    if (newTag !== "") {
        this.books[bookId].tags.push(newTag);
        this.books[bookId].tags = uniqueArray(this.books[bookId].tags);
    }
}

// Remove tag from a book
Model.prototype.removeTagFromBook = function(bookId, removedTag) {
    const indexOfTag = this.books[bookId].tags.indexOf(removedTag);
    if (indexOfTag > -1) {
        this.books[bookId].tags.splice(indexOfTag, 1);
    }        
}

// Get book's tags array by id
Model.prototype.getBookTags = function(bookId) {
    return this.books[bookId].tags;
}

// Is this book most popular
Model.prototype.isMostPopular = function(book) {
    return (book.rating == this.maxRating - 1)
}

// Search filter by title and author
Model.prototype.searchByFilter = function(book, filter) {
        return (book.title.toLowerCase().indexOf(filter) > -1 || book.author.toLowerCase().indexOf(filter) > -1)
}

// Get new rating and update
Model.prototype.getRating = function(bookId) {
    return this.books[bookId].rating;             
} 

// Set new rating and update
Model.prototype.setRating = function(bookId, rating) {
    if (rating > -2) {
        this.books[bookId].rating = rating;
    }
    console.log(this.books[bookId]);
} 

// Add new book
Model.prototype.addNewBook = function(bookTitle, bookAuthor, bookCover) {
    const that = this;
    this.books.push(new Book(that.books.length, bookTitle, bookAuthor, -1, this.imagePath + bookCover));
    console.log(that.books[that.books.length - 1]);
    
    return this.books[that.books.length - 1];                            
}

// Get book object by id
Model.prototype.getBookById = function(bookId) {
    return this.books[bookId];             
}

// Get name of the book by id
Model.prototype.getBookTitle = function(bookId) {
    return this.books[bookId].title;             
}

// Get author of the book by id
Model.prototype.getBookAuthor = function(bookId) {
    return this.books[bookId].author;             
}

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
    this.action;
}

History.prototype.setBookId = function(bookId) {
    this.bookId = bookId;
};

History.prototype.setFilter = function(filterName) {
    this.filter = filterName;
};

History.prototype.setAction = function(action) {
    this.action = action;
};

History.prototype.getBookId = function() {
    return this.bookId;
};

History.prototype.getFilter = function() {
    return this.filter;
};

History.prototype.getAction = function() {
    return this.action;
};

History.prototype.getDateAdd = function() {
    return this.dateAdd;
};

History.prototype.getAction = function() {
    return this.action;
};

// Add history mark add new book
Model.prototype.addHistoryAddBook = function(bookId) {
    const historyItem = new History();
    historyItem.setBookId(bookId);
    historyItem.setAction(this.historyActions.addNewBook);
    this.allHistory.unshift(historyItem);
    console.log(this.allHistory);
}

// Add history mark when user used filter
Model.prototype.addHistoryFilter = function(filterName) {
    const historyItem = new History();
    historyItem.setFilter(filterName);
    historyItem.setAction(this.historyActions.filter);
    this.allHistory.unshift(historyItem);
}

// Add history mark when user changed rating
Model.prototype.addHistoryChangeRating = function(bookId) {
    const historyItem = new History();
    historyItem.setBookId(bookId);
    historyItem.setAction(this.historyActions.rating);
    this.allHistory.unshift(historyItem);
}