// set the current selected page in the nav bar
function loadFunction(page)
    {
        const navElems = document.querySelectorAll('.nav__elem');
        navElems.forEach((elem) => {
            elem.classList.remove('nav__elem--selected');
            if (elem.textContent == page)
                elem.classList.add('nav__elem--selected');
        });
    };