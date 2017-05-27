function View(model, controller) {
    this.model = model;
    this.ctrl = controller;

    this.booksElement = document.getElementsByClassName("books")[0];
    this.mostPopularElement = document.getElementById("most-popular-filter");
    this.searchInput = document.getElementById("search");

    this.formAddBook = document.forms.namedItem("addNewBookForm");
    this.addBookWindow = document.getElementById("add-book-window");
    this.bookAddSuccess = this.addBookWindow.getElementsByClassName("add-book-window__text-success")[0];
    this.bookAddError = this.addBookWindow.getElementsByClassName("add-book-window__text-success")[0];

    this.browseBookPage = document.getElementById("browse-book");
    this.historyPage = document.getElementById("history-book");

    this.defaultCover = "defaultCover.jpg";

    this.bookInfoWindow = document.getElementById("book-info");

    this.notificationIdMask = "notification-";
}

View.prototype.init = function () {
    const addBookButton = document.getElementById("add-book-button");
    const addBookWindowClose = document.getElementById("add-book-window-close");
    const bookInfoWindowClose = document.getElementById("book-info-close");
    const addTagButton = document.getElementById("book-info-add-tag-btn");
    const inputTagElement = document.getElementById("new-tag-name-input");
    const that = this;

    // Show most popular books event
    this.mostPopularElement.addEventListener('click', event => {
        if (that.isBookPageActive())
            that.mostPopularFilter(event);
    });

    // Search book event on input
    this.searchInput.addEventListener('input', () => {
        if (that.isBookPageActive())
            that.searchBook(that.model.books);
    });

    // Search book event
    this.searchInput.addEventListener('blur', () => {
        let search = that.searchInput.value;
        if (that.isBookPageActive() && search !== "") {
            that.ctrl.historySearch(search);
        }
    });

    // Add new book event
    this.formAddBook.addEventListener('submit', event => {
        that.addNewBookForm(event);
    }, false);

    // Show add book window
    addBookButton.addEventListener('click', () => {
        that.bookAddSuccess.style.display = "none";
        that.bookAddError.style.display = "none";
        that.addBookWindow.style.display = "block";
    });

    // Close add book window by close button
    addBookWindowClose.addEventListener('click', () => {
        that.addBookWindow.style.display = "none";
    });

    // Close book info window by close button
    bookInfoWindowClose.addEventListener('click', () => {
        that.bookInfoWindow.style.display = "none";
    });

    // Close modal window by clicking around
    window.addEventListener('click', event => {
        if (event.target == this.addBookWindow) {
            this.addBookWindow.style.display = "none";
        }
        if (event.target == this.bookInfoWindow) {
            this.bookInfoWindow.style.display = "none";
        }
    });

    // Add event for button "Add Tag"
    addTagButton.addEventListener('click', this.AddTagHandler.bind(this));

    //Add tag on press Enter
    inputTagElement.addEventListener('keypress', event => {
        if (event.keyCode == 13) {
            that.AddTagHandler();
        }
    });

    this.historyPage.addEventListener('click', () => {
        this.showHistoryPage(this.model.allHistory);
    });

    this.browseBookPage.addEventListener('click', () => {
        this.showBooks(this.model.books);
    });
};

// Show all book
View.prototype.showBooks = function (books) {
    let i = 0;

    this.historyPage.classList.remove("nav__item_selected");
    this.browseBookPage.classList.add("nav__item_selected");

    while (this.booksElement.firstChild) {
        this.booksElement.removeChild(this.booksElement.firstChild);
    }

    for (i; i < books.length; i += 1) {
        this.showBook(books[i]);
    }
    this.updateViewIfFilters();
};

// Update rating
View.prototype.updateRating = function (id, rating, maxRating) {
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
};

//Show one book
View.prototype.showBook = function (book) {
    const bookItem = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookName = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookRating = document.createElement("p");
    const maxRating = this.model.maxRating;
    const that = this;

    bookItem.classList.add("books__item");
    bookItem.setAttribute("book-id", book.id);

    bookImage.setAttribute("alt", "book about food");
    bookImage.setAttribute("src", book.image);
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

    bookImage.addEventListener('click', this.bookInfoHandler.bind(this));

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
};

// Show book on page
View.prototype.displayBook = function (book) {
    const thisBook = this.booksElement.getElementsByClassName("books__item")[book.id];
    thisBook.style.display = "";
};

// Hide book on page
View.prototype.hideBook = function (book) {
    const thisBook = this.booksElement.getElementsByClassName("books__item")[book.id];
    thisBook.style.display = "none";
};

// Show only most popular books 
View.prototype.showMostPopularBooks = function (books) {
    let i = 0;
    for (i; i < books.length; i += 1) {
        if (this.model.isMostPopular(books[i])) {
            this.displayBook(books[i]);
        }
        else {
            this.hideBook(books[i]);
        }
    }
};

// Display all books
View.prototype.displayAllBooks = function (books) {
    let i = 0;
    for (i; i < books.length; i += 1) {
        this.displayBook(books[i]);
    }
};

// Find most popular books
View.prototype.mostPopularFilter = function (event) {
    const target = event.target;
    if (!target.classList.contains("filter__item_selected")) {
        target.classList.add("filter__item_selected");
        if (this.searchInput.value === "")
            this.showMostPopularBooks(this.model.books);
        else {
            this.searchBook(this.model.books);
        }
        this.ctrl.historyFilter("Most Popular");
    }
    else {
        target.classList.remove("filter__item_selected");
        if (this.searchInput.value === "")
            this.displayAllBooks(this.model.books);
        else
            this.searchBook(this.model.books);
    }
};

// Search filter
View.prototype.searchBook = function (books) {
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
};

View.prototype.updateViewIfFilters = function () {
    const isMostPopularSelected = document.getElementById("most-popular-filter").classList.contains("filter__item_selected");
    const isSearchFilterEmpty = this.searchInput.value === "";

    // If filter and search is active update books list
    if (isMostPopularSelected && isSearchFilterEmpty) {
        this.showMostPopularBooks(this.model.books);
    }
    else if (!isSearchFilterEmpty) {
        this.searchBook(this.model.books);
    }

    return isMostPopularSelected || !isSearchFilterEmpty;
};

// Change rating
View.prototype.changeRating = function (bookId, rating) {
    this.updateRating(bookId, rating, this.model.maxRating);
    this.updateViewIfFilters();
};

// Add events for stars rating
View.prototype.addStarEvents = function (star) {
    this.starMouseOver(star);
    this.starMouseOut(star);
    this.starClick(star);
};

// Event for star rating on mouse over
View.prototype.starMouseOver = function (star) {
    const that = this;
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("mouseover", function () {
        that.updateRating(bookId, star.getAttribute("data-index"), that.model.maxRating);
    });
};

// Event for star rating on mouse out
View.prototype.starMouseOut = function (star) {
    const that = this;
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("mouseout", function () {
        that.updateRating(bookId, that.model.getRating(bookId), that.model.maxRating);
    });
};

//Event for star rating on click
View.prototype.starClick = function (star) {
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("click", () => {
        let rating = star.getAttribute("data-index");
        this.changeRating(bookId, rating);
        this.ctrl.changeRatingHandler(bookId, rating);
    });
};

//If book page active
View.prototype.isBookPageActive = function () {
    return this.browseBookPage.classList.contains("nav__item_selected");
};

//If book page active
View.prototype.isHistoryPageActive = function () {
    return this.historyPage.classList.contains("nav__item_selected");
};

// Add new book
View.prototype.addNewBookForm = function (event) {
    const url = "/upload";
    const formFiles = document.getElementById('bookCover').files;
    let bookData = {};    

    bookData.bookTitle = document.getElementById("bookTitle").value;
    bookData.bookAuthor = document.getElementById("bookAuthor").value;    

    event.preventDefault();

    if (formFiles.length !== 0) {
        let formData = new FormData(this.formAddBook);
        bookData.bookCover = formFiles[0].name;                
        this.ctrl.addNewBookWithCover(formData, url, bookData);        
    }
    else {
        bookData.bookCover = this.defaultCover;
        this.ctrl.createNewBook(bookData);                
    }
};

// Show book considering filters and current page 
View.prototype.showNewBook = function (newBook) {        
        if (this.isBookPageActive()) {
            this.showBook(newBook);
            this.updateViewIfFilters();
        }                
        if (this.isHistoryPageActive()) {
            this.showHistoryPage(this.model.allHistory);
        }
};

// Show message if book was added successfully
View.prototype.bookAddSuccessMsg = function () {
    this.bookAddSuccess.style.display = "none";
    this.bookAddSuccess.style.display = "block";
};

// Show message if book wasn't added
View.prototype.bookAddErrorMsg = function () {
    this.bookAddError.style.display = "none";
    this.bookAddError.style.display = "block";
};

// Show book info when user click on image
View.prototype.bookInfoHandler = function (event, id) {
    let bookId;

    if (arguments.length > 1) {
        bookId = id;
    }
    else {
        bookId = event.target.parentElement.getAttribute("book-id");
    }

    const thisBook = this.model.getBookById(bookId);
    const bookCover = this.bookInfoWindow.getElementsByClassName("book-info__book-cover")[0];
    const bookName = this.bookInfoWindow.getElementsByClassName("book-info__book-name")[0];
    const bookAuthor = this.bookInfoWindow.getElementsByClassName("book-info__book-author")[0];
    const tagInput = document.getElementById("new-tag-name-input");

    bookCover.setAttribute("src", thisBook.image);
    bookCover.setAttribute("alt", thisBook.title);
    bookName.innerHTML = thisBook.title;
    bookAuthor.innerHTML = thisBook.author;
    this.bookInfoWindow.setAttribute("book-id", bookId);

    tagInput.value = "";
    this.showAllBookTags(bookId);

    this.bookInfoWindow.style.display = "block";
};

// Update tags list
View.prototype.updateTagsList = function (tags) {
    const tagList = document.getElementById("default-tags");
    while (tagList.firstChild) {
        tagList.removeChild(tagList.firstChild);
    }
    tags.forEach(function (item, i, arr) {
        const tag = document.createElement("option");
        tag.value = item;
        tagList.appendChild(tag);
    });
};

// Create tag element
View.prototype.appendTag = function (tagName) {
    const tags = document.getElementById("tags");

    const newTag = document.createElement('div');
    const newTagName = document.createElement('span');
    const newTagClose = document.createElement('span');

    newTag.classList.add("tags__item");
    newTagName.classList.add("tags__text");
    newTagClose.classList.add("tags__remove");

    newTagClose.innerHTML = "&times;";
    newTagClose.addEventListener('click', this.removeTagHandler.bind(this));
    newTagName.innerHTML = tagName;

    newTag.appendChild(newTagName);
    newTag.appendChild(newTagClose);

    tags.appendChild(newTag);
};

// Show book tags
View.prototype.showAllBookTags = function (bookId) {
    const tagsElement = document.getElementById("tags");
    const bookTags = this.model.getBookTags(bookId);
    let i = 0;

    while (tagsElement.firstChild) {
        tagsElement.removeChild(tagsElement.firstChild);
    }

    for (i; i < bookTags.length; i += 1) {
        this.appendTag(bookTags[i]);
    }
};

// Add new tag handler
View.prototype.AddTagHandler = function () {
    const tagInput = document.getElementById("new-tag-name-input");
    const bookId = this.bookInfoWindow.getAttribute("book-id");

    this.ctrl.addNewTag(bookId, tagInput.value);
    this.showAllBookTags(bookId);
    this.updateTagsList(this.model.allBooksTags.tags);
    tagInput.value = "";
};

// Remove tag handler
View.prototype.removeTagHandler = function (event) {
    const tagName = event.target.parentNode.getElementsByClassName("tags__text")[0].innerHTML;
    const bookId = this.bookInfoWindow.getAttribute("book-id");
    this.ctrl.removeTag(bookId, tagName);
    this.showAllBookTags(bookId);
};

// NOTIFICATIONS

// Show book info when user click on the book title or author
View.prototype.addNotifictionLitner = function (notificationAction, bookId) {
    let i = 0;
    for (i; i < notificationAction.length; i += 1) {
        notificationAction[i].addEventListener("click", function (event) {
            this.bookInfoHandler(event, bookId);
        }.bind(this));
    }
};

// Add new notification to notification bar
View.prototype.showNotification = function (notificationId) {
    const elementsClasses = {
        "item": "notification__item",
        "paragraph": "notification__paragraph",
        "time": "notification__time",
        "action": "notification__action"
    };
    const notificationBar = document.getElementById("notification");

    this.showHistoryItem(this.model.allHistory[notificationId], notificationBar, elementsClasses);
};

// Hide notification
View.prototype.hideNotification = function (historyId) {    
    const notificationItem = document.getElementById(this.notificationIdMask + historyId);
    if (notificationItem !== null) {
        //notificationItem.style.display = "none";
        notificationItem.parentNode.removeChild(notificationItem);
    } else 
        return;
};

// HISTORY PAGE 

// Show history page
View.prototype.showHistoryPage = function (history) {
    const elementsClasses = {
        "item": "history__item",
        "paragraph": "history__paragraph",
        "time": "history__time",
        "action": "history__action"
    };
    let i = 0;
    this.browseBookPage.classList.remove("nav__item_selected");
    this.historyPage.classList.add("nav__item_selected");

    while (this.booksElement.firstChild) {
        this.booksElement.removeChild(this.booksElement.firstChild);
    }

    const notificationElement = document.createElement("div");
    notificationElement.classList.add("history");
    this.booksElement.appendChild(notificationElement);

    for (i; i < history.length; i += 1) {        
            this.showHistoryItem(history[i], notificationElement, elementsClasses);
    }
};

// Show history page
View.prototype.showHistoryItem = function (historyItem, notificationElement, elementsClasses) {
    const historyActions = this.model.historyActions;
    const bookId = historyItem.getBookId();

    const notificationItem = document.createElement("div");
    const notificationParagraph = document.createElement("p");
    const notificationTime = document.createElement("p");

    notificationItem.classList.add(elementsClasses.item);    
    notificationParagraph.classList.add(elementsClasses.paragraph);
    notificationTime.classList.add(elementsClasses.time);        
    notificationElement.insertBefore(notificationItem, notificationElement.firstChild);

    notificationItem.appendChild(notificationParagraph);
    notificationItem.appendChild(notificationTime);

    if (elementsClasses.item === "notification__item") {
        notificationItem.setAttribute("id", this.notificationIdMask + historyItem.getHistoryId());        
        this.ctrl.notificationHide(historyItem.getHistoryId());        
    }

    if (historyItem.getAction() === historyActions.addNewBook) {
        notificationParagraph.innerHTML = 'You added <span class="' +
            elementsClasses.action + '">' +
            this.model.getBookTitle(bookId) + "</span>" + " by " + '<span class="' +
            elementsClasses.action + '">' +
            this.model.getBookAuthor(bookId) + "</span>";

        let notificationAction = notificationParagraph.getElementsByClassName(elementsClasses.action);
        this.addNotifictionLitner(notificationAction, bookId);
    }
    else if (historyItem.getAction() === historyActions.filter) {
        notificationParagraph.innerHTML = 'You used <span class="' +
            elementsClasses.action + '">' +
            historyItem.getFilter() + "</span>" + " filter";
    }
    else if (historyItem.getAction() === historyActions.rating) {
        const rating = parseInt(historyItem.getRating()) + 1;
        notificationParagraph.innerHTML = 'You changed rating of the book <span class="' +
            elementsClasses.action + '">' +
            this.model.getBookTitle(bookId) + "</span>" + " by " +
            '<span class="' + elementsClasses.action + '">' +
            this.model.getBookAuthor(bookId) + "</span> to " + rating;

        let notificationAction = notificationParagraph.getElementsByClassName(elementsClasses.action);
        this.addNotifictionLitner(notificationAction, bookId);
    }
    else if (historyItem.getAction() === historyActions.search) {
        notificationParagraph.innerHTML = 'You searched for <span class="' +
            elementsClasses.action + '">' +
            historyItem.getFilter() + "</span>";
    }
    notificationTime.innerHTML = historyItem.getDateAdd();    
};