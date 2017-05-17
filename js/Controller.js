function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

// Load all books from JSON file
Controller.prototype.loadBooksData = function() {
    return this.model.loadBooksData();
}

//Event for star rating on click
Controller.prototype.changeRatingHandler = function(bookId, rating) {
    this.model.setRating(bookId, rating);
    this.view.changeRating(bookId, rating);
}

//Create new book
Controller.prototype.createNewBook = function(bookTitle, bookAuthor, bookCover) {
    return this.model.addNewBook(bookTitle, bookAuthor, bookCover);
}

// Add new tag to a book
Controller.prototype.addNewTag = function(bookId, tagName) {
    this.model.addNewTagToBook(bookId, tagName);
    this.model.allBooksTags.addTag(tagName);
}

// Remove tag from a book
Controller.prototype.removeTag = function(bookId, tagName) {
    this.model.removeTagFromBook(bookId, tagName);
}

Controller.prototype.start = function () {
    this.view.init();
}