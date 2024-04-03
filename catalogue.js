async function cataloguePage() {
    console.log("cataloguePage");
    let catalogue = document.getElementById("catalogue");
    let books = await getBooks();
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        let bookDiv = document.createElement("div");
        bookDiv.setAttribute("class", "catalogue__book");

        let img = document.createElement("img");
        img.setAttribute("class", "catalogue__book_img");
        let url = "Content/" + book.title.toLowerCase().replace(/ /g, '-') + "-cover.jpg";
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

async function getBooks(page = 1, pageLen = 8) {
    // fetch N books from the database and return them as an array, literally no idea how to do this
    // const response = await fetch('http://localhost:3000/books?page=' + page + '&length=' + pageLen);
    // const books = await response.json();
    
    const books = [{
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        genre: 'Fiction',
        pages: 180,
        publisher: 'Charles Scribner\'s Sons',
        cover: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg'
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Romance',
        pages: 279,
        publisher: 'T. Egerton, Whitehall',
        cover: ''
    },    
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        genre: 'Fiction',
        pages: 281,
        publisher: 'J.B. Lippincott & Co.',
        cover: ''
    },
    {
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'Dystopian',
        pages: 328,
        publisher: 'Secker & Warburg',
        cover: ''
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        year: 1951,
        genre: 'Fiction',
        pages: 277,
        publisher: 'Little, Brown and Company',
        cover: ''
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        year: 1937,
        genre: 'Fantasy',
        pages: 310,
        publisher: 'Allen & Unwin',
        cover: ''
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        year: 1954,
        genre: 'Fantasy',
        pages: 1178,
        publisher: 'Allen & Unwin',
        cover: ''
    },
    {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        year: 2003,
        genre: 'Mystery',
        pages: 689,
        publisher: 'Doubleday',
        cover: ''
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        year: 1988,
        genre: 'Fiction',
        pages: 177,
        publisher: 'HarperCollins',
        cover: ''
    },
    {
        title: 'The Little Prince',
        author: 'Antoine de Saint-Exupéry',
        year: 1943,
        genre: 'Fable',
        pages: 96,
        publisher: 'Reynal & Hitchcock',
        cover: ''
    }
    ];

    return books.splice((page-1) * pageLen, pageLen);
}

function bookInfo(title) {
    console.log(title);
}