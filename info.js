class CreativeWork {
    constructor(title, authors, year) {
        this.title = title;
        this.authors = authors;
        this.year = year;
    }
}

class Person {
    constructor(name, birthDate) {
        this.name = name;
        this.birthDate = birthDate;
    }
}

class Company {
    constructor(name, link = "") {
        this.name = name;
        if (link != "") {
            this.link = link;
        } else {
            this.wiki = "https://en.wikipedia.org/wiki/" + name;;
        }
    }
}

class Book extends CreativeWork {
    constructor(title, authors, year, genre, publisher, coverURL, plot) {
        super(title, authors, year);
        this.genre = genre;
        this.publisher = publisher;
        this.coverURL = coverURL;
        this.plot = plot;
    }
}

class Author extends Person {
    constructor(name, birthDate, books) {
        super(name, birthDate);
        this.books = books;
        this.link = "https://en.wikipedia.org/wiki/" + name;
    }
}

class Publisher extends Company {
    constructor(name, books, link = "") {
        super(name, link);
        this.books = [] + books;
    }
}


