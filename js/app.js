/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// check which element is active

function getActiveElement() {
    maxSection = sections[0];
    minVal = 1000000;

    for (item of sections) {
        let bounding = item.getBoundingClientRect();

        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };

    return maxSection;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function addSections() {
    for (let element of sections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = element.id;
        section.innerText = element.dataset.nav;
        navbar.appendChild(section);
    };
};
// Add class 'active' to section when near top of viewport

function activeStatus() {
    window.addEventListener('scroll', function (event) {

        let section = getActiveElement();
        section.classList.add('your-active-class');

        // then, we're gonna make other sections inactive 

        for (let element of sections) {
            if (element.id != section.id & element.classList.contains('your-active-class')) {
                element.classList.remove('your-active-class');
            }
        }

        // the following step we're gonna style the header

        const activeSection = document.querySelector('li[data-nav="' + section.id + '"]');
        activeSection.classList.add('active__link');

        // then removing from other headers

        const headers = document.querySelectorAll('.menu__link');
        for (let element of headers) {
            console.log(element);

            if (element.dataset.nav != activeSection.dataset.nav & element.classList.contains('active__link')) {
                element.classList.remove('active__link');
            }
        };

    });
};

// Scroll to anchor ID using scrollTO event

function scrollToSection() {
    navbar.addEventListener('click', function (event) {
        const clicked = document.querySelector('#' + event.target.dataset.nav)
        clicked.scrollIntoView();
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
addSections();
// Scroll to section on link click
scrollToSection();
// Set sections as active
activeStatus();