async function cataloguePage() {
    let catalogue = document.getElementById("catalogue");
    console.log("catalogue");
    const bookRequest = await fetch('http://webtech.science.uu.nl/group28/books?page=' + 1 + '&length=' + 8)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.error(err));
    const books = bookRequest.data;
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        let bookDiv = document.createElement("div");
        bookDiv.setAttribute("class", "catalogue__book");

        let img = document.createElement("img");
        img.setAttribute("class", "catalogue__book_img");
        let url = book.title.toLowerCase().replace(/ /g, '-') + "-cover.jpg";
        if (book.cover != '') {
            url = book.cover;
        }
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
        
        console.log(bookDiv);
        catalogue.appendChild(bookDiv);
    }
}

function updateCatalogue() {
    let catalogue = document.getElementById("catalogue");
    while (catalogue.firstChild) {
        catalogue.removeChild(catalogue.firstChild);
    }
    cataloguePage();
}

function bookInfo(title) {
    console.log(title);
}