async function cataloguePage(p = 1, mode = "create") {
    let content = document.getElementById("content");

    const bookRequest = await fetch('http://webtech.science.uu.nl/group28/books?mode=cat&page=' + p)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.error(err));
    
    // If the server cannot find books, it returns an error message of "No match"
    // If this happens on an update call, it means all books in the db have previously been displayed
    // thus we should not go to the next page, instead we stay on the current page
    if (bookRequest.data) {
        const books = bookRequest.data;

        // A catalogue page consists of a page navigation bar and a catalogue of books
        // On an update, the page navigation number is updated with the current page number, but not the buttons are not rebuilt
        // The catalogue div persists, the book panels (class="catalogue__book") are rebuilt from scratch

        //  <div class="catalogue">
        //      // for each book:
        //      <div class="catalogue__book"> 
        //          <img class="catalogue__book_img" src="Content/book-1-cover.jpg">
        //          <div class="catalogue__book_text">
        //              <p>Title: Book 1</p>
        //              <p>Author: Author 1</p>
        //          </div>
        //          <button class="catalogue__book_button" onclick="bookInfo()">Read more</button>
        //      </div>
        //  </div>

        let catalogue, pageNumber, pageNavigation, previousButton, nextButton;
        switch (mode) {
            case "create":
                pageNavigation = document.createElement("div");
                pageNavigation.setAttribute("class", "page-navigation");
                previousButton = document.createElement("button");
                previousButton.setAttribute("class", "page-navigation__button");
                previousButton.setAttribute("onclick", "previousPage()");
                previousButton.textContent = "\<";
                pageNavigation.appendChild(previousButton);

                pageNumber = document.createElement("p");
                pageNumber.setAttribute("class", "page-navigation__number");
                pageNumber.setAttribute("id", "page-number");
                pageNumber.textContent = p;
                pageNavigation.appendChild(pageNumber);

                nextButton = document.createElement("button");
                nextButton.setAttribute("class", "page-navigation__button");
                nextButton.setAttribute("onclick", "nextPage()");
                nextButton.textContent = "\>";
                pageNavigation.appendChild(nextButton);

                content.appendChild(pageNavigation);

                catalogue = document.createElement("div");
                catalogue.setAttribute("class", "catalogue");
                catalogue.setAttribute("id", "catalogue");
                break;
            case "update":
                pageNumber = document.getElementById("page-number");
                pageNumber.textContent = p;
                catalogue = document.getElementById("catalogue");
                catalogue.innerHTML = "";
                break;
        }

        for (let i = 0; i < books.length; i++) {
            let book = books[i];
            let bookDiv = document.createElement("div");
            bookDiv.setAttribute("class", "catalogue__book");

            let img = document.createElement("img");
            img.setAttribute("class", "catalogue__book_img");
            let url = '';
            if (book.cover != '') { url = book.cover; }
            else if (book.title.includes("Example")) { url = "sample-cover.jpg"; }
            else { url = book.title.toLowerCase().replace(/ /g, '-') + "-cover.jpg"; }
            img.setAttribute("src", url);
            img.setAttribute("alt", book.title + " cover");
            bookDiv.appendChild(img);

            let textDiv = document.createElement("div");
            textDiv.setAttribute("class", "catalogue__book_text");
            title = document.createElement("p");
            title.textContent = "Title: " + book.title;
            textDiv.appendChild(title);
            author = document.createElement("p");
            author.textContent = "Author: " + book.author;
            textDiv.appendChild(author);
            bookDiv.appendChild(textDiv);

            let moreButton = document.createElement("button");
            moreButton.setAttribute("class", "catalogue__book_button");
            moreButton.setAttribute("onclick", "bookInfo(\""+book.title+"\")");
            moreButton.textContent = "Read more";
            bookDiv.appendChild(moreButton);
            
            catalogue.appendChild(bookDiv);
        }
        content.appendChild(catalogue);

    } else if (bookRequest.error == "No match" && mode == "update") { 
        console.log("Attempted to go to a page that doesn't exist, staying on current page");
    } else {
        let error = document.createElement("p");
        error.textContent = "Error, no books found. Please try to refresh the page.";
        content.appendChild(error);
    }
}

function nextPage() {
    let nextPageNum = parseInt(document.getElementById("page-number").textContent) + 1;
    cataloguePage(nextPageNum, "update");
}

function previousPage() {
    let nextPageNum = parseInt(document.getElementById("page-number").textContent) - 1;
    if (nextPageNum > 0) {
        cataloguePage(nextPageNum, "update");
    } else {
        console.log("Attempted to go to a page that doesn't exist, staying on current page");
    }
}

function bookInfo(title) {
    console.log(title);
}