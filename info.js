function loadInfo(id) {
    fetch(`http://webtech.science.uu.nl/group28/book?id=${id}`)
        .then(response => response.json())
        .then(book => {
console.log(book.data)
            fillPage(book.data);
        })
        .catch(error => console.error('Error fetching book information:', error));
};

function fillPage(book) {
    const contentArticle = document.getElementById("content");

    const bookInfo = document.createElement("div");
    bookInfo.setAttribute("class", "book-info");

    const image = document.createElement("img");    
    image.setAttribute("class", "book-info__img");
    let url = '';
    if (book.cover != '') { url = book.cover; }
    else if (book.title.includes("example")) { url = "sample-cover.jpg"; }
    else { url = book.title.toLowerCase().replace(/ /g, '-') + "-cover.jpg"; }
    image.setAttribute("src", url);
    image.setAttribute("alt", `The cover of the book: ${book.title}`);

    const sideText = document.createElement("div");
    sideText.setAttribute("class", "book-info__side-text");

    const title = document.createElement("h2");
    title.textContent = book.title;
    sideText.appendChild(title);

    const authors = document.createElement("p");
    authors.textContent = "Author: " + book.author;
    sideText.appendChild(authors);

    const year = document.createElement("p");
    year.textContent = "Publishing year: " + book.year;
    sideText.appendChild(year);

    const genre = document.createElement("p");
    genre.textContent = "Genre: " + book.genre;
    sideText.appendChild(genre);

    const pages = document.createElement("p");
    pages.textContent = "Pages: " + book.pages;
    sideText.appendChild(pages);

    const publisher = document.createElement("p");
    publisher.textContent = "Publisher: " + book.publisher;
    sideText.appendChild(publisher);


    bookInfo.appendChild(image);
    bookInfo.appendChild(sideText);
    contentArticle.appendChild(bookInfo);


    const summary = document.createElement("section");
    summary.setAttribute("class", "summary");

    const summaryTitle = document.createElement("h3");
    summaryTitle.textContent = "Summary";
    summary.appendChild(summaryTitle);

    const summaryText = document.createElement("p");
    summaryText.textContent = book.summary;
    summary.appendChild(summaryText);

    contentArticle.appendChild(summary);

    const reserverButton = document.createElement("button");
    reserverButton.setAttribute("class", "book-info__button");
    reserverButton.setAttribute("onclick", "reserveBook()");
    reserverButton.textContent = "Reserve";
    contentArticle.appendChild(reserverButton);

}