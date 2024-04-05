require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const url = require('url');
const { start } = require("repl");

//Paths to files/directories
const absoluteStatic = __dirname + "/public";
const absoluteStaticImages = __dirname + "/images";
const databaseFile = __dirname + "/database.db"

//Port number as an environment variable for security
const port = process.env.PORT;

const db = new sqlite3.Database(databaseFile, sqlite3.OPEN_READWRITE, (err) => {
		if (err) return console.error(err)
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

app.get("/books", (req, res) => {
    try {
        let page = 1        // default page number
        let length = 8;     // default number of books per page
        
        const queryObject = url.parse(req.url, true).query; // Get parameters
        page   = queryObject.page;  
        length = queryObject.length;

        let sql = `SELECT * FROM 'books' LIMIT ${(page-1) * length},${length}`;
        // let sql = `SELECT * FROM 'books'`;
        console.log(sql);
        db.all(sql, [], (err, rows) => {
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

app.get("/info.html", (req, res) => {
    res.sendFile(__dirname + "/views/info.html");
});

app.get("/more.html", (req, res) => {
    res.sendFile(__dirname + "/views/more.html");
});

app.get("/author.html", (req, res) => {
    res.sendFile(__dirname + "/views/author.html");
});

app.get("/reviews.html", (req, res) => {
    res.sendFile(__dirname + "/views/reviews.html");
});

app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/links.html", (req, res) => {
    res.sendFile(__dirname + "/views/links.html");
});

//use body-parser to hide content stored in URL when using POST
app.use(bodyParser.urlencoded({ extended: false }));

//routers for POST requests.
app.post("/login.html", (req, res) => {
    const { email, password } = req.body;
    // Check credentials in the database and authenticate the user
    // Add authentication logic here
});

//User authentication middleware.
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
}));

//final destination if none of the routers above were a match for the client's GET request.
app.use((req, res) => {
		res.status(404).send("Error: 404 Page not found!");
});

app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
});