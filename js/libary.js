const booksDataFile = 'booksData.json';    
let booksData = [];           
    
function loadJson() {
    let xmlRequest = new XMLHttpRequest();

    xmlRequest.onreadystatechange = function() {
        if(xmlRequest.readyState === 4) {
            booksData = JSON.parse(xmlRequest.responseText);                                            
        };
    };
    xmlRequest.open("GET", booksDataFile, true);
    xmlRequest.send();
};

loadJson();

window.onload = init;

function init() {
    const searchInput = document.getElementById("search");        
    const booksElement = document.getElementsByClassName("books")[0];    
    const mostPopularElement = document.getElementById("most-popular-filter");
    
    const addBookWindow = document.getElementById("add-book-window");
    const addBookButton = document.getElementById("add-book-button");
    const addBookWindowClose = document.getElementById("add-book-window-close");
    const AddBookWindowButton = document.getElementsByClassName("add-book-window__button")[0];   
    const formAddBook = document.forms.namedItem("addNewBookForm");
    
    const books = [];
    const maxRating = 5;    
    const imagePath = "img/";

    // Book constructor
    function Book(id, title, author, rating, image){
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.image = image;
    }
    
    // Function for searching
    Book.prototype.searchBy = function(filter) {
        return (this.title.toLowerCase().indexOf(filter) > -1 || this.author.toLowerCase().indexOf(filter) > -1)
    }
    
    // Update rating
    Book.prototype.updateRating = function(rating) {                        
        const bookRating = document.getElementsByClassName("books__rating")[this.id].children;
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
    
    // Set new rating and update
    Book.prototype.setRating = function(rating) {
        if (rating > -2) {
            this.rating = rating;
            this.updateRating(this.rating);
        }             
    } 
    
    // Show all books on the page
    Book.prototype.showBook = function() {  

        const bookItem = document.createElement("div");
        const bookImage = document.createElement("img");
        const bookName = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookRating = document.createElement("p");        
        const that = this;

        bookItem.classList.add("books__item");
        bookItem.setAttribute("book-id",this.id);

        bookImage.setAttribute("alt","book about food");
        bookImage.setAttribute("src",imagePath+this.image);
        bookImage.classList.add("books__image");

        bookName.classList.add("books__name");
        bookName.innerHTML = this.title;

        bookAuthor.classList.add("books__author");
        bookAuthor.innerHTML = this.author;

        bookRating.classList.add("books__rating");

        booksElement.appendChild(bookItem);

        bookItem.appendChild(bookImage);
        bookItem.appendChild(bookName);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(bookRating);   

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
        this.updateRating(this.rating);
    };
    
    // Return true if title or author are not null
    Book.prototype.isExist = function() {
        return (this.title || this.author)
    }
    
    // Add events for stars rating
    Book.prototype.addStarEvents = function(star) {
        this.starMouseOver(star);
        this.starMouseOut(star);
        this.starClick(star);
    }
    
    // Event for star rating on mouse over
    Book.prototype.starMouseOver = function(star) {
        const that = this;
        star.addEventListener("mouseover", function() {
              that.updateRating(star.getAttribute("data-index"));
        })
    }
    
    // Event for star rating on mouse out
    Book.prototype.starMouseOut = function(star) {
        const that = this;
        star.addEventListener("mouseout", function() {
              that.updateRating(that.rating);
        })
    }
    
    //Event for star rating on click
    Book.prototype.starClick = function(star) {
        const that = this;
        star.addEventListener("click", function() {
              that.setRating(star.getAttribute("data-index"));
        })        
    }
    
    // Show book on page
    Book.prototype.show = function() {        
        const thisBook = booksElement.getElementsByClassName("books__item")[this.id];        
        thisBook.style.display = "";
    } 
    
    // Hide book on page
    Book.prototype.hide = function() {        
        const thisBook = booksElement.getElementsByClassName("books__item")[this.id];        
        thisBook.style.display = "none";
    } 
    
    Book.prototype.isMostPopular = function() {
        return (this.rating == maxRating - 1)
    }
    
    //Show books
    function showBooks(){
        let i = 0;
        while (booksElement.firstChild) {
            booksElement.removeChild(booksElement.firstChild);
        }
        for (i; i < booksData.length; i += 1) {              
            
            let title = booksData[i].title;
            let author = booksData[i].author;
            let rating = booksData[i].rating;
            let image = booksData[i].image;                        
                                    
            books[i] = new Book(i, title, author, rating, image);
            books[i].showBook();
        }    
    }
    
    showBooks();        
    
    // Search handler for input
    function searchHandler() {        
        let filter = searchInput.value.toLowerCase();
        let i = 0;        
        for (i; i < books.length; i += 1) {            
            if (books[i].isExist()) {                
                if (books[i].searchBy(filter)) {
                    books[i].show();
                }
                else {
                    books[i].hide();
                }
            }            
        }
    }
    
    function mostPopularFilterHandler(event) {
        const target = event.target;
        if (!target.classList.contains("filter__item_selected")) {             
             let i = 0; 
             target.classList.add("filter__item_selected");
             for (i; i < books.length; i += 1) {            
                if (books[i].isExist()) {                
                    if (books[i].isMostPopular()) {
                        books[i].show();
                    }
                    else {
                        books[i].hide();
                    }
                }            
             }           
        }
        else {
            let i = 0;
            target.classList.remove("filter__item_selected");
            for (i; i < books.length; i += 1) {            
                if (books[i].isExist()) {                                    
                    books[i].show();
                }            
             }
        }            
    }
    
    function addNewBookHandler(event) {        
        const bookTitle = document.getElementById("bookTitle").value;
        const bookAuthor = document.getElementById("bookAuthor").value;                
        
        let bookCover = document.getElementById('bookCover').files[0].name;
        let oData = new FormData(formAddBook);
        let oReq = new XMLHttpRequest();

        oReq.open("POST","/upload", true);

        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                console.log("success");
                books.push(new Book(books.length, bookTitle, bookAuthor, -1, bookCover));
                console.log(books[books.length - 1]);
                books[books.length - 1].showBook();
                addBookWindow.style.display = "none";
            } else {
              console.log("error " + oReq.status);
            }
        };

        oReq.send(oData);
        event.preventDefault();
    }
    
    addBookButton.addEventListener('click', function() {
        addBookWindow.style.display = "block";
    });
    
    addBookWindowClose.addEventListener('click', function() {
        addBookWindow.style.display = "none";
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == addBookWindow) {
            addBookWindow.style.display = "none";
        }
    });
    
    formAddBook.addEventListener('submit', addNewBookHandler, false);
    
    //AddBookWindowButton.addEventListener('click', addNewBookHandler);
    
    searchInput.addEventListener('input', searchHandler);        
    mostPopularElement.addEventListener('click', mostPopularFilterHandler);        
}