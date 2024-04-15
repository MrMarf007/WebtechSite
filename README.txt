Made by:
   - Stan Ruiter              | 2302888
   - Taha Charef              | 
   - Mariam Bakkali Kasmi     | 

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
   1. 



Registered users:
format: Username - Password
   1. 
   2. 
   3. 
   4. 
   5. 


Database create sqls:
Users:
   CREATE TABLE IF NOT EXISTS user (userID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)
Reservation table:
   CREATE TABLE IF NOT EXISTS reservations (reservationid INTEGER PRIMARY KEY AUTOINCREMENT, bookid INTEGER, userid INTEGER, reservation_date DATE, status TEXT)
Books table:
   CREATE TABLE IF NOT EXISTS books (bookID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, year INTEGER, genre TEXT, pages INTEGER, publisher TEXT, cover TEXT, summary TEXT, copies INTEGER)