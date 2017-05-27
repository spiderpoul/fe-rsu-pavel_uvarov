function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
    this.socket = io();
}

// Load all books from JSON file
Controller.prototype.loadBooksData = function () {
    this.model.httpGetJson("/getBooks")
        .then(books => {
            console.log("Server books");
            console.log(books);
            this.model.createTags(books);
            this.model.books = books;            
            return books;
        }, 
        error => {
            console.log("Something went wrong: " + error);
            return;
        })
        .then(books => {
            this.view.showBooks(books);
            this.view.updateTagsList(this.model.allBooksTags.tags);
        });
};

//Event for star rating on click
Controller.prototype.changeRatingHandler = function (bookId, rating) {
    let data = {
        "bookId": bookId,
        "rating": rating
    };    
    fetch('/setRating', {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then(res => {
            this.view.changeRating(bookId, rating);
            return res.json();
        })
        .then((books) => {
            this.model.books = books;
            this.view.changeRating(bookId, rating);            
            this.historyChangeRating(bookId, rating);
        })
        .catch(err => {
            console.log("Something went wrong: " + err);
        })
};

// Create new book
Controller.prototype.createNewBook = function (bookData) {
    fetch('/addNewBook', {
        method: "POST", 
        body: JSON.stringify(bookData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
    }) 
        .then(res => {
            return res.json();
        })
        .then(newBook => {
            console.log(newBook);            
            this.view.bookAddSuccessMsg();            
            this.view.showNewBook(newBook);      
            return newBook;                
        },
        err => {
            console.log("Error upload file: " + err);                
            this.view.bookAddErrorMsg();
        })
        .then(newBook => {
            fetch("/getBooks")
                .then(res => {
                    return res.json();
                })
                .then(books => {
                    this.model.books = books;
                    this.historyAddBook(newBook.id, bookTitle, bookAuthor);
            });            
        })
};

// Add new book and upload cover
Controller.prototype.addNewBookWithCover = function (formData, url, bookData) {
    this.model.httpPostForm(formData, url)
        .then(() => {
            this.createNewBook(bookData);
        }, err => {
            console.log("Error upload file: " + err);                
            this.view.bookAddErrorMsg();
        });
}

// Add new tag to a book
Controller.prototype.addNewTag = function (bookId, tagName) {
    this.model.addNewTagToBook(bookId, tagName);
    this.model.allBooksTags.addTag(tagName);
};

// Remove tag from a book
Controller.prototype.removeTag = function (bookId, tagName) {
    this.model.removeTagFromBook(bookId, tagName);
};

// Add history mark add book
Controller.prototype.historyAddBook = function (bookId) {
    const notificationId = this.model.addHistoryAddBook(bookId);
    this.view.showNotification(notificationId);
};

// Add history mark when user used filter
Controller.prototype.historyFilter = function (filterName) {
    const notificationId = this.model.addHistoryFilter(filterName);
    this.view.showNotification(notificationId);
};

// Add history mark when user used search
Controller.prototype.historySearch = function (searchFilter) {
    const notificationId = this.model.addHistorySearch(searchFilter);    
    this.view.showNotification(notificationId);
};

// Add history mark when user changed rating
Controller.prototype.historyChangeRating = function (bookId, rating) {
    const notificationId = this.model.addHistoryChangeRating(bookId, rating);
    this.view.showNotification(notificationId);
};

// Make notification disappear after 3 second using server
Controller.prototype.notificationHide = function (notificationId) {  
    const historyItem = this.model.allHistory[notificationId];
       
    this.socket.emit('hideNotificationRequest', notificationId);
    this.socket.on('allowHideNotification', res => {
        //if (!historyItem.getIsTimerEnable()) {
            this.view.hideNotification(res);
            //historyItem.timerEnable();
        //}
    });
};

Controller.prototype.start = function () {
    this.loadBooksData();
    this.view.init();
};