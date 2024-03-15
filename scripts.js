// set the current selected page in the nav bar
function loadFunction(page)
    {
        const navElems = document.querySelectorAll('.nav__elem');
        navElems.forEach((elem) => {
            elem.classList.remove('nav__elem--selected');
            if (elem.textContent == page)
                elem.classList.add('nav__elem--selected');
        });
    }

// loop through elements and change their font-size to either small, medium or large
function changeFontSizeSmall()
    {
        document.querySelectorAll('.title, .content__title, .nav__elem').forEach(function (element) {
            element.style.fontSize = "small";
        });

        document.querySelectorAll('p').forEach(function (element) {
            element.style.fontSize = "small";
        });

        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (element) {
            element.style.fontSize = "small";
        });

        document.querySelectorAll('a').forEach(function (element) {
            element.style.fontSize = "small";
        });

        document.querySelectorAll('li').forEach(function (element) {
            element.style.fontSize = "small";
        });

        document.querySelector('.body').style.fontSize = "small";

        document.querySelector('.navBar').style.fontSize = "small";
    }

function changeFontSizeMedium()
    {
        document.querySelectorAll('.title, .content__title, .nav__elem').forEach(function (element) {
            element.style.fontSize = "medium";
        });

        document.querySelectorAll('p').forEach(function (element) {
            element.style.fontSize = "medium";
        });

        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (element) {
            element.style.fontSize = "medium";
        });

        document.querySelectorAll('a').forEach(function (element) {
            element.style.fontSize = "medium";
        });

        document.querySelectorAll('li').forEach(function (element) {
            element.style.fontSize = "medium";
        });

        document.querySelector('.body').style.fontSize = "medium";

        document.querySelector('.navBar').style.fontSize = "medium";
    }

function changeFontSizeLarge()
    {
        document.querySelectorAll('.title, .content__title, .nav__elem').forEach(function (element) {
            element.style.fontSize = "large";
        });

        document.querySelectorAll('p').forEach(function (element) {
            element.style.fontSize = "large";
        });

        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (element) {
            element.style.fontSize = "large";
        });

        document.querySelectorAll('a').forEach(function (element) {
            element.style.fontSize = "large";
        });

        document.querySelectorAll('li').forEach(function (element) {
            element.style.fontSize = "large";
        });

        document.querySelector('.body').style.fontSize = "large";

        document.querySelector('.navBar').style.fontSize = "large";
    }

// retrieve the current text-color and use it as a reference point to toggle text-color to blue or #092530
function changeColorText() 
    {   
        textCol = window.getComputedStyle(document.querySelector('.content__title')).getPropertyValue("--text-color");
        var currentColor = window.getComputedStyle(document.querySelector('.content__title')).textDecorationColor;

        // console.log("curcol: " + currentColor);
        // console.log("textcol: " + textCol);

        if (currentColor == "rgb(0, 0, 255)") 
        {

            document.querySelectorAll('.book-info__text').forEach(function (element) {
                element.style.color = textCol;
            });
    
            document.querySelector('.body').style.color = textCol;

            // document.querySelectorAll('.content__title').forEach(function (element) {
            //     element.style.color = textCol;
            // });
    
            // document.querySelectorAll('p').forEach(function (element) {
            //     element.style.color = textCol;
            // });
    
            // // document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (element) {
            // //     element.style.color = textCol;
            // // });
    
            // document.querySelectorAll('a').forEach(function (element) {
            //     element.style.color = textCol;
            // });
    
            // document.querySelectorAll('li').forEach(function (element) {
            //     element.style.color = textCol;
            // });
    
            // document.querySelector('.navBar').style.color = textCol;
        }
        else if (currentColor === textCol)
        {

            document.querySelectorAll('.book-info__text').forEach(function (element) {
                element.style.color = "rgb(0, 0, 255)";
            });
    
            document.querySelector('.body').style.color = "rgb(0, 0, 255)";

            // document.querySelectorAll('.content__title').forEach(function (element) {
            //     element.style.color = "#0000FF";
            // });
            
            // document.querySelectorAll('p').forEach(function (element) {
            //     element.style.color = "#0000FF";
            // });
    
            // document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (element) {
            //     element.style.color = "#0000FF";
            // });
    
            // document.querySelectorAll('a').forEach(function (element) {
            //     element.style.color = "#0000FF";
            // });
    
            // document.querySelector('.navBar').style.color = "#0000FF";
        }
    }

function registerEvents() 
    {
        var small_button = document.getElementById("small");
        var medium_button = document.getElementById("medium");
        var large_button = document.getElementById("large");
        var color_button = document.getElementById("changeColor");
        small_button.addEventListener("click", changeFontSizeSmall, false);
        medium_button.addEventListener("click", changeFontSizeMedium, false);
        large_button.addEventListener("click", changeFontSizeLarge, false);
        color_button.addEventListener("click", changeColorText, false);
    }
    
window.addEventListener("load", registerEvents, false);