const sqlite3 = require('sqlite3').verbose();

// Create a new database
const db = new sqlite3.Database('library.db');

// Create a table
db.serialize(() => {
    db.run('DROP TABLE IF EXISTS books');
    db.run('CREATE TABLE IF NOT EXISTS books (bookID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, year INTEGER, genre TEXT, pages INTEGER, publisher TEXT, cover TEXT)');
    // Insert a new entry into the table
    const insertQuery = `INSERT INTO books (title, author, year, genre, pages, publisher, cover) VALUES (?, ?, ?, ?, ?, ?, ?)`;
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

    books.forEach((book) => {
        db.run(insertQuery, [book.title, book.author, book.year, book.genre, book.pages, book.publisher, book.cover], function(err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`New book entry added to the database. ${this.lastID}`);
            }
        });
    });
});