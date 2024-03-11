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
    constructor(title, authors, year, genre, pages, publisher, coverURL, plot) {
        super(title, authors, year);
        this.genre = genre;
        this.pages = pages
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


function infoPage() {
    const contentArticle = document.getElementById("content");

    console.log("Loading info page content...");
    const writer = new Author("Jane Austen", "16 December 1775", ["Pride and Prejudice", "Sense and Sensibility", "Emma", "Mansfield Park", "Northanger Abbey", "Persuasion", "Lady Susan"]);
    const publisher = new Publisher("Thomas Egerton", ["Pride and Prejudice", "Sense and Sensibility"], "https://en.wikipedia.org/wiki/Thomas_Egerton_(publisher)");
    const plot = ("Summary::H4\nThe novel opens with one of the most famous lines in English literature: “It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.” The statement is seemingly what Mrs. Bennet thinks as she sets her sights on the newly arrived Bingley, who she is sure will make a suitable husband for one of her daughters. At a ball, Bingley takes an immediate interest in the beautiful and shy Jane. The encounter between his friend Darcy and Elizabeth is less cordial. Although Austen shows them intrigued by each other, she reverses the convention of first impressions: the pride of rank and fortune and prejudice against the social inferiority of Elizabeth’s family hold Darcy aloof, while the pride of self-respect and prejudice against Darcy’s snobbery hold Elizabeth equally aloof.\nThe pompous Collins soon arrives, hoping to marry one of the Bennet sisters. Mrs. Bennet steers him toward Elizabeth, but the latter refuses his offer of marriage. He instead becomes engaged to her friend Charlotte. During this time, Elizabeth encounters the charming Wickham. There is a mutual attraction between the two, and he informs her that Darcy has denied him his inheritance.\nAfter Bingley abruptly departs for London, Elizabeth’s dislike of Darcy mounts as she becomes convinced that he is discouraging Bingley’s relationship with Jane. Darcy, however, has grown increasingly fond of Elizabeth, admiring her intelligence and vitality. While visiting the now-married Charlotte, Elizabeth sees Darcy, who professes his love for her and proposes. A surprised Elizabeth refuses his offer, and, when Darcy demands an explanation, she accuses him of breaking up Jane and Bingley and of denying Wickham his inheritance. Darcy subsequently writes Elizabeth a letter in which he explains that he separated the couple largely because he did not believe Jane returned Bingley’s affection. He also discloses that Wickham, after squandering his inheritance, tried to marry Darcy’s then 15-year-old sister in an attempt to gain possession of her fortune. With these revelations, Elizabeth begins to see Darcy in a new light.\nShortly thereafter the youngest Bennet sister, Lydia, elopes with Wickham. The news is met with great alarm by Elizabeth, since the scandalous affair—which is unlikely to end in marriage—could ruin the reputation of the other Bennet sisters. When she tells Darcy, he persuades Wickham to marry Lydia, offering him money. Despite Darcy’s attempt to keep his intervention a secret, Elizabeth learns of his actions. At the encouragement of Darcy, Bingley subsequently returns, and he and Jane become engaged. Finally, Darcy proposes again to Elizabeth, who this time accepts.\n - Summary written by Sarah Dillon|href=https://www.britannica.com/topic/Pride-and-Prejudice::CR::content__credits")
    const intro = "About the book::H3::content__text-header\nPride and Prejudice, a romantic novel by Jane Austen, published anonymously in three volumes in 1813. A classic of English literature, written with incisive wit and superb character delineation, it centres on the burgeoning relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. Upon publication, Pride and Prejudice was well received by critics and readers. The first edition sold out within the first year, and it never went out of print."
    const review = "Review::H4\nPride and Prejudice by Jane Austen is my favorite book of all time-- which isn't a phrase I throw out lightly! This book truly has the best of all worlds-- a wonderful romance, lovable characters, humor, and beautiful writing. Pride and Prejudice is the story of a young woman in the 1800's, Elizabeth Bennet. The Bennet family has five daughters, and in an age where the only thing women could do was marry rich, all the girls are pressured to find wealthy matches to secure the family's comfort. Elizabeth, however, refuses to marry the first man the comes along, and only marry when for love. She meets brooding, silent, proud and very rich Mr. Darcy, who at first has no interest in Elizabeth.\nOver time, he begins to fall in love with her wit and charm. Elizabeth thinks Darcy is the last man she could ever marry, but through the course of the novel, begins to see that her prejudices towards him are fake and that he is a true gentleman who is only shy. The questions remains-- will they overcome their pride and prejudices and get married? I'm not a huge fan of 'classical classics' where the writing style is dull and hard to understand. I was so pleased to find that this is not the case with Austen's writing style. I enjoyed every single page of this wonderful novel, and truly did not want it to end! I will certainly be reading more Austen! I would recommend this book to anyone-- fans of romance, family-oriented stories, comedies, fans of classics, and even reluctant readers of classics who would like an easy gateway into the world of classic novels.\n - Review written by Allie S.|href=https://ppld.org/book-reviews/pride-and-prejudice-2::CR::content__credits"
    const readMore = "Read more::H3::content__text-header\nWant to read more books like Pride and Prejudice?---Discover more books here.|href=more.html::PcA::in-page-link\nDo you want to read reviews of this book?---Find out what other people think.|href=reviews.html::PcA::in-page-link\nIf you want to learn everything about this book and read reviews.---Go to this books goodreads page.|href=https://www.goodreads.com/book/show/1885.Pride_and_Prejudice::PcA::in-page-link"
    const book = new Book(
        "Pride and Prejudice",	
        [writer],
        1813,
        "Romance",
        435,
        publisher,
        "Content/pride-and-prejudice-cover.jpg",
        plot
        )
    
    const title = document.createElement("h2");
    title.textContent = "Pride and Prejudice book information";
    title.setAttribute("class", "content__title");
    contentArticle.appendChild(title);
    contentArticle.appendChild(parseBookInfo(book));
    contentArticle.appendChild(parseStringToHTML(intro));
    contentArticle.appendChild(parseStringToHTML(book.plot));
    contentArticle.appendChild(parseStringToHTML(review));
    contentArticle.appendChild(parseStringToHTML(readMore));
}

function parseStringToHTML(str) {
    let paragraphs = str.split("\n");
    let result = document.createElement("section");
    for (elem in paragraphs) {
        // console.log(paragraphs[elem]);
        let node, type, content, assignedClass, child, childInfo;
        splittedElem = paragraphs[elem].split("::");
        content = splittedElem[0];
        type = splittedElem[1];
        assignedClass = splittedElem[2];

        switch (type) {
            case "CR":
                node = document.createElement("a");
                childInfo = content.split("|href=");
                content = childInfo[0];
                node.setAttribute("href", childInfo[1]);
                break;
            case "PcA":
                node = document.createElement("p");
                child = document.createElement("a");
                childInfo = content.split("|href=");
                child.textContent = childInfo[0].split("---")[1];
                child.setAttribute("href", childInfo[1]);
                child.setAttribute("class", assignedClass);
                assignedClass = "p__link";
                content = childInfo[0].split("---")[0];
                break;
            case "H4":
                node = document.createElement("h4");
                break;
            case "H3":
                node = document.createElement("h3");
                break;
            default:
                node = document.createElement("p");
                break;
        }
        node.textContent = content + " ";
        if (assignedClass)  { node.setAttribute("class", assignedClass);    }
        if (child)          { node.appendChild(child);                      }
        result.appendChild(node);
    }
    return result;
}

function parseBookInfo(book) {
    let result = document.createElement("div");
    result.setAttribute("class", "book-info");

    let image = document.createElement("img");
    image.setAttribute("class", "book-info__img");
    image.setAttribute("src", book.coverURL);
    image.setAttribute("alt", "The cover of the book Pride and Prejudice");

    let sideText = document.createElement("div");
    sideText.setAttribute("class", "book-info__side-text");
    authors = document.createElement("p");
    authors.textContent = "Authors: ";
    for (i in book.authors) {
        if (i > 0) { Authors.textContent += ", "; }
        authors.textContent += book.authors[i].name;
    }
    sideText.appendChild(authors);

    let year = document.createElement("p");
    year.textContent = "Publishing year: " + book.year;
    sideText.appendChild(year);

    let genre = document.createElement("p");
    genre.textContent = "Genre: " + book.genre;
    sideText.appendChild(genre);

    let pages = document.createElement("p");
    pages.textContent = "Pages: " + book.pages;
    sideText.appendChild(pages);

    let publisher = document.createElement("p");
    publisher.textContent = "Publisher: " + book.publisher.name;
    sideText.appendChild(publisher);

    result.appendChild(image);
    result.appendChild(sideText);

    return result;
}