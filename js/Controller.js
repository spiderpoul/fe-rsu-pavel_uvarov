function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

// Most popular filter
Controller.prototype.mostPopularFilterHandler = function(event) {
    this.view.mostPopularFilter(event);
}

// Update rating
Controller.prototype.updateRatingHandler = function(bookId, rating, maxRating) {
    this.view.updateRating(bookId, rating, maxRating);
}

//Event for star rating on click
Controller.prototype.changeRatingHandler = function(bookId, rating) {
    this.view.changeRating(bookId, rating);
}
/*
Controller.prototype.increase = function () {
    this.model.increment();
}

Controller.prototype.decrease = function () {
    this.model.decrement();
}
*/
Controller.prototype.start = function () {
    this.view.init();
    //this.model.setInitialValue(0);
}