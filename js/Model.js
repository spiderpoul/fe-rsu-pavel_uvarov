function Model() {
    this.currentValue = null;    
    this.booksData = []; 
    
    this.books = [];
    this.maxRating = 5;    
    this.imagePath = "img/";
    
    this.booksDataFile = 'booksData.json'; 
    
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

                //allBooksTags.addTag(bookTags);                                    

                //that.books[i].setTags(bookTags);                            
            }                        
        };
    };
    
    xmlRequest.open("GET", this.booksDataFile, false);
    xmlRequest.send();   
    return that.books;
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

// Is this book most popular
Model.prototype.isMostPopular = function(book) {
    return (book.rating == this.maxRating - 1)
}

// Search filter by title and author
Model.prototype.searchByFilter = function(book, filter) {
        return (book.title.toLowerCase().indexOf(filter) > -1 || book.author.toLowerCase().indexOf(filter) > -1)
}

// Set new rating and update
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