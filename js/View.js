function View(model, controller) {
    this.model = model;
    this.ctrl = controller;
    
    this.booksElement = document.getElementsByClassName("books")[0];
    this.mostPopularElement = document.getElementById("most-popular-filter");
    this.searchInput = document.getElementById("search");  
}

View.prototype.init = function () {
    const that = this;
    const books = this.model.loadBooksData();
    this.showBooks(books);
    
    this.mostPopularElement.addEventListener('click', function(event){
        that.ctrl.mostPopularFilterHandler(event);
    });
    
    this.searchInput.addEventListener('input', function() {
        that.ctrl.searchFilterHandler();
    })
    /*this.model.onIncrement.subscribe(function (newCounterValue) {
        that.changeElement(newCounterValue);
    });

    this.model.onDecrement.subscribe(function (newCounterValue) {
        that.changeElement(newCounterValue);
    });

    this.incrementElement.addEventListener('click', function () {
        that.ctrl.increase();
    });

    this.decrementElement.addEventListener('click', function () {
        that.ctrl.decrease();
    });*/
}

// Show all book
View.prototype.showBooks = function(books){
       
    let i = 0;
    while (this.booksElement.firstChild) {
        this.booksElement.removeChild(this.booksElement.firstChild);
    }

    for (i; i < books.length; i += 1) {                                                
        this.showBook(books[i]);
    }
}

View.prototype.updateRating = function(id, rating, maxRating){
    const bookRating = document.getElementsByClassName("books__rating")[id].children;
    let i = 0;
    function fillStar(star) {
        star.classList.remove("fa-star-o");
        star.classList.add("fa-star");
    }
    function clearStar(star) {
        star.classList.remove("fa-star");
        star.classList.add("fa-star-o");
    }
    for (i = 0; i < maxRating; i += 1) {
        if (bookRating[i].classList.contains("fa-star"))
            clearStar(bookRating[i]);
    }
    for (i = 0; i < maxRating; i += 1) {
        if (rating > -1) {                               
            if (i == rating) {
                fillStar(bookRating[i]);
                return;
            }
            else {
                fillStar(bookRating[i]);
            }
        }
        else 
            return;
    }
}

//Show one book
View.prototype.showBook = function(book){
    const bookItem = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookName = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookRating = document.createElement("p");        
    const maxRating = this.model.maxRating;
    const that = this;

    bookItem.classList.add("books__item");
    bookItem.setAttribute("book-id",book.id);

    bookImage.setAttribute("alt","book about food");
    bookImage.setAttribute("src",book.image);
    bookImage.classList.add("books__image");

    bookName.classList.add("books__name");
    bookName.innerHTML = book.title;

    bookAuthor.classList.add("books__author");
    bookAuthor.innerHTML = book.author;

    bookRating.classList.add("books__rating");

    this.booksElement.appendChild(bookItem);

    bookItem.appendChild(bookImage);
    bookItem.appendChild(bookName);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookRating);   

    //bookImage.addEventListener('click', bookInfoHandler);

    // Add stars rating elements
    function addRating() {
        let j = 0;
        for (j; j < maxRating; j++) {
            let star = document.createElement('i');
            let nextLine = document.createTextNode('\n');
            star.classList.add("fa");
            star.classList.add("fa-star-o");
            star.setAttribute("data-index", j);                               
            bookRating.appendChild(star);
            bookRating.appendChild(nextLine); 
            that.addStarEvents(star);
        }    
    }

    addRating();    
    this.updateRating(book.id, book.rating, maxRating);
}

// Show book on page
View.prototype.displayBook = function(book) {
    const thisBook = this.booksElement.getElementsByClassName("books__item")[book.id]; 
    thisBook.style.display = "";
}

// Hide book on page
View.prototype.hideBook = function(book) {
    const thisBook = this.booksElement.getElementsByClassName("books__item")[book.id];   
    thisBook.style.display = "none";
}

// Show only most popular books 
View.prototype.showMostPopularBooks = function(books) {
    let i = 0;
    for (i; i < books.length; i += 1) {                           
        if (this.model.isMostPopular(books[i])) {
            this.displayBook(books[i]);
        }
        else {
            this.hideBook(books[i]);
        }           
    }
}

// Show all books
View.prototype.showAllBooks = function (books) {
    let i = 0;
    for (i; i < books.length; i += 1) {                                               
        this.displayBook(books[i]);          
     }
}

// Find most popular books
View.prototype.mostPopularFilter = function(event) {
    const target = event.target;
    if (!target.classList.contains("filter__item_selected")) { 
        target.classList.add("filter__item_selected");
        this.showMostPopularBooks(this.model.books);       
    }
    else {            
        target.classList.remove("filter__item_selected");
        this.showAllBooks(this.model.books);
    }            
}

// Search filter
View.prototype.searchBook = function(books) {        
    const isMostPopularSelected = document.getElementById("most-popular-filter").classList.contains("filter__item_selected");
    let filter = this.searchInput.value.toLowerCase();
    let i = 0;        
    for (i; i < books.length; i += 1) {                           
        if (this.model.searchByFilter(books[i], filter)) {
            if (!isMostPopularSelected)
                this.displayBook(books[i]);
            else
                if (this.model.isMostPopular(books[i])) {
                    this.displayBook(books[i]);
                } else 
                     this.hideBook(books[i]);
        }
        else {
            this.hideBook(books[i]);
        }           
    }
}

// Change rating
View.prototype.changeRating = function(bookId, rating) {
    this.model.setRating(bookId, rating);
    this.updateRating(bookId, rating, this.model.maxRating);
    if (document.getElementById("most-popular-filter").classList.contains("filter__item_selected")) {
        this.showMostPopularBooks(this.model.books);
    }
}

// Add events for stars rating
View.prototype.addStarEvents = function(star) {
    this.starMouseOver(star);
    this.starMouseOut(star);
    this.starClick(star);
}

// Event for star rating on mouse over
View.prototype.starMouseOver = function(star) {
    const that = this;    
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("mouseover", function() {
          that.ctrl.updateRatingHandler(bookId, star.getAttribute("data-index"), that.model.maxRating);
    });
}

// Event for star rating on mouse out
View.prototype.starMouseOut = function(star) {
    const that = this;
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("mouseout", function() {
          that.ctrl.updateRatingHandler(bookId, that.model.getRating(bookId), that.model.maxRating);
    })
}

//Event for star rating on click
View.prototype.starClick = function(star) {
    const that = this;
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("click", function() {
          that.ctrl.changeRatingHandler(bookId, star.getAttribute("data-index"));
    })        
}
/*View.prototype.changeElement = function (newValue) {
    this.counterElement.innerHTML = newValue;
}*/