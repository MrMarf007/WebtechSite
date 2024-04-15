require("dotenv").config();
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
const session = require("express-session");
const alert = require('alert'); 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const SqliteStore = require('connect-sqlite3')(session);
const url = require('url');
const { start } = require("repl");

//Paths to files/directories
const absoluteStatic = __dirname + "/public";
const absoluteStaticImages = __dirname + "/images";
const databaseFile = __dirname + "/database.db";
const sessionDatabaseFile = __dirname + "/sessions.db";

//Port number as an environment variable for security
const port = process.env.PORT;
const cookiesecret = process.env.COOKIESECRET;

const db = new sqlite3.Database(databaseFile, sqlite3.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
});

//logger that logs the request method, path and ip.
function logger(req, res, next) {
  console.log(req.method, "|", req.path, req.ip);
	console.log("-".repeat(35));
  next();
}

app.use(logger);

//load the static files (styles.css, info.js, images etc.)
app.use(express.static(absoluteStatic));
app.use(express.static(absoluteStaticImages));

//User session middleware.
app.use(session({
  store: new SqliteStore,
  secret: cookiesecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000 } // 10 minutes
}));

//routers for GET requests.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/catalogue.html", (req, res) => {
  res.sendFile(__dirname + "/views/catalogue.html");
});

app.get("/more.html", (req, res) => {
  res.sendFile(__dirname + "/views/more.html");
});

app.get("/author.html", (req, res) => {
  if (!req.session.logged_in){
    res.redirect("login.html");
    res.status(403);
  } else {
    res.sendFile(__dirname + "/views/author.html");
		res.status(200);
  }
});
app.get("/reviews.html", (req, res) => {
  res.sendFile(__dirname + "/views/reviews.html");
});

app.get("/logout.html", (req, res) => {
  res.sendFile(__dirname + "/views/logout.html");
});

app.get("/register.html", (req, res) => {
	if (req.session.logged_in) {
		res.render(__dirname + "/views/profile", {name: req.session.username});
	} else {
  res.sendFile(__dirname + "/views/register.html");
	}
});

/*
app.get("/testflash.html", (req, res) => {
  res.render(__dirname + "/views/profile", {name: req.session.username});
});
*/

app.get("/login.html", (req, res) => {
	if (req.session.logged_in) {
		res.render(__dirname + "/views/profile", {name: req.session.username});
	} else {
  res.sendFile(__dirname + "/views/login.html");
	}
});


app.get("/info.html", (req, res) => {
  try {
  const queryObject = url.parse(req.url, true).query;
  if (queryObject.id) {
  	bookId = queryObject.id;
  } else {
	  bookId = 1
  }

  res.render(__dirname + "/views/info", { id: bookId });

  } catch (error) {
    res.status(400).send("success: false");
  }
});


app.get("/books", (req, res) => {
  try {
      let page = 1        // default page number
      let length = 8;     // number of books per page
      
      const queryObject = url.parse(req.url, true).query; // Get parameter
      mode = queryObject.mode;
      page = queryObject.page;
      params = [((page-1) * length), length];

      let sql = `SELECT bookID, title, author, cover FROM 'books' LIMIT ?, ?`;
      db.all(sql, params, (err, rows) => {
          if (err) { 
              return res.json({ status: 200, success: false, error: err }); }

          if (rows.length < 1) { 
              return res.json({ status: 300, success: false, error: "No match" }); }

          return res.json({ status: 200, data: rows, success: true });
          
      });
  } catch (error) {
      return res.json({ status: 400, success: false});
  }
});

app.get("/book", (req, res) => {
  try {
      const queryObject = url.parse(req.url, true).query; // Get parameter
      mode = queryObject.id;
      params = [id];

      let sql = `SELECT * FROM 'books' WHERE bookID = ?`;
      db.get(sql, params, (err, rows) => {
          if (err) { 
              return res.json({ status: 200, success: false, error: err }); }

          if (rows.length < 1) { 
              return res.json({ status: 300, success: false, error: "No match" }); }

          return res.json({ status: 200, data: rows, success: true });
          
      });
  } catch (error) {
      return res.json({ status: 400, success: false});
  }
});



//routers for user authentication
app.post("/login.html", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`This is password.length: ${password.length}`);
  console.log(`This is the user ${username}, password: ${password}`);

  let getCredentials = `SELECT * FROM user WHERE username = "${username}"`;
  try {
    let rows = await new Promise((resolve, reject) => {
        db.all(getCredentials, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });

    console.log(`Rows found:`, rows);
		
		let storedPassword = rows[0].password;
    if (rows.length === 0) {
      console.log(`This account does not exist, try again: "${username}"`);
    } else {
      const passwordMatch = await bcrypt.compare(password, storedPassword);
  
      if (passwordMatch) {
        console.log(`You have successfully logged in with username: "${username}" and password: "${password}"`);
      	req.session.logged_in = true;
      	req.session.username = username;
				console.log(`req.session.logged_in: ${req.session.logged_in}`);
				console.log(`req.session.username: ${req.session.username}`);
				console.log(`req.session: ${req.session}`);
        res.sendFile(__dirname + "/views/catalogue.html");
      } else {
        res.status(400);
        res.send("Invalid password");
      }
    }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server error");
  }
});

app.post("/register.html", async (req, res) => {
	if (req.session.logged_in) {
		res.render(__dirname + "/views/profile", {name: req.session.username});
	} else {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`This is password.length: ${password.length}`);
    console.log(`This is the user ${username}, password: ${password}`);
    let getUserQuery = `SELECT * FROM user WHERE username = "${username}"`;

    try {
        let rows = await new Promise((resolve, reject) => {
            db.all(getUserQuery, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });

        console.log(`Rows found:`, rows);

        if (rows.length === 0) {
          console.log(`Your account is unique`);
          if (password.length < 6) {
            res.status(400).send("Your password is too short!");
          } else {
            let passwordHash = await bcrypt.hash(password, 10);
            let createUserQuery = `INSERT INTO user (username, password) VALUES (?, ?)`;
            await new Promise((resolve, reject) => {
              db.run(createUserQuery, [username, passwordHash], (err) => {
                if (err) reject(err);
                resolve();
              });
            });
            res.redirect("login.html");
            res.status(200);
          }
        } else {
          console.log(`Account already exists`);
          res.status(400).send(`There already is an account with this username: "${username}"`);
        }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server error");
    }
	}
});

app.get('/logoutconfirm.html', function(req, res) {
	if (req.session.logged_in) {
		console.log(`This session was found and will be destroyed: ${req.session.username}`);
		req.session.logged_in = false;
		req.session.destroy();
		res.redirect("/group28/index.html");
	} else {
		console.log("There was no session to be found");
		res.status(500).send("Internal server error");
  }
  
  // make sure there is a href "Log out" and reference to /logout
});

//final destination if none of the routers above were a match for the client's GET request.
app.use((req, res) => {
  res.status(404).send("Error: 404 Page not found!");
});

app.listen(port || 8028, () => {
  console.log(`Server is running on port: ${port}`);
});