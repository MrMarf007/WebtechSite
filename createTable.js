const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const db = new sqlite3.Database("database.db");

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS books');
    db.run('CREATE TABLE IF NOT EXISTS books (bookID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, year INTEGER, genre TEXT, pages INTEGER, publisher TEXT, cover TEXT, summary TEXT, copies INTEGER)');
    // Insert a new entry into the table
    const insertQuery = `INSERT INTO books (title, author, year, genre, pages, publisher, cover, summary, copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try { 
        const books = JSON.parse(fs.readFileSync('books.json', 'utf8')).books; 
        console.log(books)
        books.forEach((book) => {
            db.run(insertQuery, [book.title, book.author, book.year, book.genre, book.pages, book.publisher, book.cover, book.summary, book.copies], function(err) {
                if (err) {
                    console.error(err.message);
                } 
            });
        });
    }
    catch (err) { console.error(err); }
});