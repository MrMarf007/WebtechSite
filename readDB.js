const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./library.db');

// fetch should somehow trigger this
getBooks(1, 8);

function getBooks(page, length) {
    let sql = `SELECT * FROM 'books' LIMIT ${(page-1) * length},${(page-1) * length + length}`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            console.log(rows);
            return rows;
        }
    });
}

// close the database connection
db.close();
