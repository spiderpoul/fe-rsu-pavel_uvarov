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
    const bookAddSuccess = addBookWindow.getElementsByClassName("add-book-window__text-success")[0];
    const bookAddError = addBookWindow.getElementsByClassName("add-book-window__text-success")[0];
    const formAddBook = document.forms.namedItem("addNewBookForm");
    
    const bookInfoWindow = document.getElementById("book-info");
    const bookInfoWindowClose = document.getElementById("book-info-close");
    const addTagButton = document.getElementById("book-info-add-tag-btn");
    const inputTagElement = document.getElementById("new-tag-name-input");
    
    const books = [];
    const maxRating = 5;    
    const imagePath = "img/";
    
    let allBooksTags = new TagsClass(["Must Read Titles","Best Of List","Classic Novels","Non Fiction"]);

    // Tags class constructor
    function TagsClass(defaultTags) {
        this.tags = defaultTags;
    }
    
    TagsClass.prototype.addTag = function (newTags) {
        if (Array.isArray(newTags))
            Array.prototype.push.apply(this.tags, newTags);
        else 
            this.tags.push(newTags);
        this.tags = uniqueArray(this.tags);
    }
    
    TagsClass.prototype.updateTagsList = function () {
        const tagList = document.getElementById("default-tags");
        while (tagList.firstChild) {
            tagList.removeChild(tagList.firstChild);
        }        
        this.tags.forEach( function(item, i, arr) {
            const tag = document.createElement("option"); 
            tag.value = item;
            tagList.appendChild(tag);
        });        
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
            if (document.getElementById("most-popular-filter").classList.contains("filter__item_selected")) {
                showMostPopularBooks();
            }
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
        
        bookImage.addEventListener('click', bookInfoHandler);
        
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
    
    // Is this book most popular
    Book.prototype.isMostPopular = function() {
        return (this.rating == maxRating - 1)
    }
    
    // Show book tags
    Book.prototype.showAllTags = function() {
        const tags = document.getElementById("tags");        
        let i = 0;
        
        while (tags.firstChild) {
            tags.removeChild(tags.firstChild);
        }
        
        for (i; i < this.tags.length; i += 1) {
            this.appendTag(this.tags[i]);
        }
    }
    
    Book.prototype.appendTag = function(tagName) {
        const tags = document.getElementById("tags");
        
        const newTag = document.createElement('div');
        const newTagName = document.createElement('span');
        const newTagClose = document.createElement('span');
        
        newTag.classList.add("tags__item");
        newTagName.classList.add("tags__text");
        newTagClose.classList.add("tags__remove");
        
        newTagClose.innerHTML = "&times;";
        newTagClose.addEventListener('click', removeTagHandler);
        newTagName.innerHTML = tagName;
        
        newTag.appendChild(newTagName);
        newTag.appendChild(newTagClose);
        
        tags.appendChild(newTag);
    }
    
    // Add new tag
    Book.prototype.addNewTag = function(newTag) {
        if (newTag !== "") {
            this.tags.push(newTag);
            this.tags = uniqueArray(this.tags);
            this.showAllTags();    
        }
    }
    
    // Set tags
    Book.prototype.setTags = function(arrTags) {
        this.tags = arrTags;
    }
    
    // Remove tag
    Book.prototype.removeTag = function(removedTag) {
        const indexOfTag = this.tags.indexOf(removedTag);
        if (indexOfTag > -1) {
            this.tags.splice(indexOfTag, 1);
            this.showAllTags();
        }
        
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
            let bookTags = booksData[i].tags.split(",");                    
            
            books[i] = new Book(i, title, author, rating, image);
            
            bookTags = uniqueArray(bookTags);
            
            allBooksTags.addTag(bookTags);                                    
            
            books[i].setTags(bookTags);            
            books[i].showBook();
        }
        allBooksTags.updateTagsList();
    }    
    showBooks();   
    
    // Search handler for input
    function searchHandler() {        
        const isMostPopularSelected = document.getElementById("most-popular-filter").classList.contains("filter__item_selected");
        let filter = searchInput.value.toLowerCase();
        let i = 0;        
        for (i; i < books.length; i += 1) {            
            if (books[i].isExist()) {                
                if (books[i].searchBy(filter)) {
                    if (!isMostPopularSelected)
                        books[i].show();
                    else
                        if (books[i].isMostPopular()) {
                            books[i].show();
                        } else 
                             books[i].hide();
                }
                else {
                    books[i].hide();
                }
            }            
        }
    }
    
    // Show only most popular books 
    function showMostPopularBooks() {
        let i = 0;
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
    
    // Show all books
    function showAllBooks() {
        let i = 0;
        for (i; i < books.length; i += 1) {            
            if (books[i].isExist()) {                                    
                books[i].show();
            }            
         }
    }
    
    // Find most popular books
    function mostPopularFilterHandler(event) {
        const target = event.target;
        if (!target.classList.contains("filter__item_selected")) { 
            target.classList.add("filter__item_selected");
            showMostPopularBooks();       
        }
        else {            
            target.classList.remove("filter__item_selected");
            showAllBooks();
        }            
    }
    
    // Add new book handler
    function addNewBookHandler(event) {        
        const bookTitle = document.getElementById("bookTitle").value;
        const bookAuthor = document.getElementById("bookAuthor").value;                
        
        bookAddSuccess.style.display = "none";
        bookAddError.style.display = "none";
        
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
                bookAddSuccess.style.display = "block";
            } else {
              console.log("error " + oReq.status);
              bookAddError.style.display = "block";
            }
        };

        oReq.send(oData);
        event.preventDefault();
    }
    
    // Show book info
    function bookInfoHandler(event) {
        const bookId = event.target.parentElement.getAttribute("book-id");        
        const thisBook = books[bookId];        
        const bookCover = bookInfoWindow.getElementsByClassName("book-info__book-cover")[0];
        const bookName = bookInfoWindow.getElementsByClassName("book-info__book-name")[0];
        const bookAuthor = bookInfoWindow.getElementsByClassName("book-info__book-author")[0];
        const tagInput = document.getElementById("new-tag-name-input");
        
        
        bookCover.setAttribute("src", imagePath + thisBook.image);
        bookCover.setAttribute("alt", thisBook.title);
        bookName.innerHTML = thisBook.title;
        bookAuthor.innerHTML = thisBook.author;
        bookInfoWindow.setAttribute("book-id", bookId);
        
        tagInput.value = "";
        thisBook.showAllTags();
        
        bookInfoWindow.style.display = "block";         
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
    
    // Add new tag handler
    function AddTagHandler() {
        const tagInput = document.getElementById("new-tag-name-input");                
        const i = bookInfoWindow.getAttribute("book-id");

        books[i].addNewTag(tagInput.value); 
        
        allBooksTags.addTag(tagInput.value);
        allBooksTags.updateTagsList();
        
        tagInput.value = "";
    }
    
    function removeTagHandler(event) {
        const tagName = event.target.parentNode.getElementsByClassName("tags__text")[0].innerHTML;        
        const bookId = bookInfoWindow.getAttribute("book-id");        
        books[bookId].removeTag(tagName);
    }
    
    // Show add book window
    addBookButton.addEventListener('click', function() {
        bookAddSuccess.style.display = "none";
        bookAddError.style.display = "none";
        addBookWindow.style.display = "block";        
    });
    
    // Close add book window by close button
    addBookWindowClose.addEventListener('click', function() {
        addBookWindow.style.display = "none";
    });
    
    // Close modal window by clicking around
    window.addEventListener('click', function(event) {
        if (event.target == addBookWindow) {
            addBookWindow.style.display = "none";
        }
        if (event.target == bookInfoWindow) {
            bookInfoWindow.style.display = "none";
        }
    });
    
    // Close book info window by close button
    bookInfoWindowClose.addEventListener('click', function() {
        bookInfoWindow.style.display = "none";
    });
    
    addTagButton.addEventListener('click', AddTagHandler);
    
    //Add tag on press Enter
    inputTagElement.addEventListener('keypress', function(event) {
       if  (event.keyCode == 13) {
           AddTagHandler();
       }
    });
    
    formAddBook.addEventListener('submit', addNewBookHandler, false);
    
    searchInput.addEventListener('input', searchHandler);        
    mostPopularElement.addEventListener('click', mostPopularFilterHandler);        
}
