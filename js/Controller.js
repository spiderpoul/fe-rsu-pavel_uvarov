function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

// Load all books from JSON file
Controller.prototype.loadBooksData = function() {
    return this.model.loadBooksData();
};

//Event for star rating on click
Controller.prototype.changeRatingHandler = function(bookId, rating) {
    this.model.setRating(bookId, rating);
    this.view.changeRating(bookId, rating);
    this.historyChangeRating(bookId)
};

//Create new book
Controller.prototype.createNewBook = function(bookTitle, bookAuthor, bookCover) {
    return this.model.addNewBook(bookTitle, bookAuthor, bookCover);
};

// Add new tag to a book
Controller.prototype.addNewTag = function(bookId, tagName) {
    this.model.addNewTagToBook(bookId, tagName);
    this.model.allBooksTags.addTag(tagName);
};

// Remove tag from a book
Controller.prototype.removeTag = function(bookId, tagName) {
    this.model.removeTagFromBook(bookId, tagName);
};

// Add history mark add book
Controller.prototype.historyAddBook = function(bookId) {
    this.model.addHistoryAddBook(bookId);
    this.view.showNotificationAddBook(bookId);
};

// Add history mark when user used filter
Controller.prototype.historyFilter = function(filterName) {
    this.model.addHistoryFilter(filterName);
    this.view.showNotificationFilter(filterName);
};

// Add history mark when user changed rating
Controller.prototype.historyChangeRating = function(bookId) {
    this.model.addHistoryChangeRating(bookId);
    this.view.showNotificationChangeRating(bookId);
};

Controller.prototype.start = function () {
    this.view.init();
};