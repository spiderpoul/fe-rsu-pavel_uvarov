function Model() {
    this.currentValue = null;    
    this.booksData = []; 
    
    this.books = [];
    this.maxRating = 5;    
    this.imagePath = "img/";
    
    this.booksDataFile = 'booksData.json'; 
    
    //Create default tags
    this.allBooksTags = new TagsClass(["Must Read Titles","Best Of List","Classic Novels","Non Fiction"]);
    
    /*this.onIncrement = new EventEmitter();
    this.onDecrement = new EventEmitter();*/
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

/*// Add new tag to a book
Model.prototype.addNewTag = function(newTag) {
    if (newTag !== "") {
        this.books[bookId].tags.push(newTag);
        this.books[bookId].tags = uniqueArray(this.tags);
        //this.showAllTags();    
    }
}

// Set tags to a book
Model.prototype.setTags = function(arrTags) {
    this.tags = arrTags;
}

// Remove tag from the book
Model.prototype.removeTag = function(removedTag) {
    const indexOfTag = this.tags.indexOf(removedTag);
    if (indexOfTag > -1) {
        this.tags.splice(indexOfTag, 1);
        this.showAllTags();
    }        
}
*/

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

// Get new rating and update
Model.prototype.getBookById = function(bookId) {
    return this.books[bookId];             
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

/*Model.prototype.increment = function () {
    this.currentValue++;
    this.onIncrement.notify(this.currentValue);
}

Model.prototype.decrement = function () {
    this.currentValue--;
    this.onDecrement.notify(this.currentValue);
}

Model.prototype.setInitialValue = function (initialValue) {
    this.currentValue = initialValue;
    this.onIncrement.notify(this.currentValue);
}*/