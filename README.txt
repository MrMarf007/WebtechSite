Made by: Group28
   - Stan Ruiter              |  2302888
   - Taha Charef              |  8947597
   - Mariam Bakkali Kasmi     |  9186603



Link:
   http://webtech.science.uu.nl/group28/



Overview:
Folder paths are preceded by a '/', files have a filetype

/group28/views:
// folder containing the html (and ejs) files
   1. catalogue.html
      // Base html of the catalogue page, uses catalogue.js
   2. info.ejs
      // Base html of info page, .ejs to get data delivered with from server, uses info.js
   3. login.html
      // Base html of login page, uses login.js
   4. logout.html
      // Base html of logout page
   5. profile.ejs
      // Base html of profile page, .ejs to get data delivered with from server, uses profile.js
   6. register.html
      // Base html of register page, uses register.js
   7. reservations.html
      // Base html of reservations page

/group28/public
// folder containing public js files, and the css file
   1. catalogue.js
      // JS functions of catalogue page, fills the page using dom manipulation and fetches the data.
   2. info.js
      // File containing the functions for info.js
   3. login.js
      // File containing the functions for logging in functionality
   4. register.js
      // File containing the functions for acount registering
   5. scripts.js
      // File for scripts used on every page (in the nav, header or footer) !! mostly unused, leftover from HW2 !!
   6. style.css
      // Contains all css styling for the whole website

/group28/images
// folder containing all images the website contains as a file.

/group28
   1. books.json / reservation.json
      // JSON files containing data for the books / reservations, was used to fill the databases at creation
   2. createBook.js / createReservation.js / createUser.js
      // helper files for creating the different tables in the database
   3. database.db 
      // the database, with tables: user, reservations, books
      // the user table consists of columns: userID, username, password. The password column only stores the hash of the password
      // the reservations table consists of columns: reservationid, bookid, userid,	reservation_date 
      // the books table consists of columns: bookID, title, author, year, genre, pages, publisher, cover, summary
   4. main.js
      // the main backend js file, using express and sqlite3 to run the website
   5. sessions
      // database for all the active sessions
      // this consists of columns: sid, expired, sess
      // these save the sessionID, expiry date, and information about login status and username
   6. viewReservation.js / viewUser.js
      // files to view whole table, was only used for debugging



Registered users:
      Username:   -  Password:
   1. stan        -  stan123
   2. mariam      -  mariam123
   3. taha        -  taha123
   4. test1       -  test123
   5. test2       -  test123



Database create sqls:
Users:
   CREATE TABLE IF NOT EXISTS user (userID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)
Reservation table:
   CREATE TABLE IF NOT EXISTS reservations (reservationid INTEGER PRIMARY KEY AUTOINCREMENT, bookid INTEGER, userid INTEGER, reservation_date DATE, status TEXT)
Books table:
   CREATE TABLE IF NOT EXISTS books (bookID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, year INTEGER, genre TEXT, pages INTEGER, publisher TEXT, cover TEXT, summary TEXT, copies INTEGER)