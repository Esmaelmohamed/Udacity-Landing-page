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
let navbar = document.getElementById("navbar__list"); 
let sections = document.querySelectorAll("section"); 
let sectionNames = [];
let sectionIds = [];
let navbarMenu = document.querySelector(".navbar__menu"); 
let sectionPositions = [];
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// 1. Get section data (name and id)
function getDataFromSection(){
    sections.forEach((sec) => {
        sectionNames.push(sec.getAttribute("data-nav")); 
        sectionIds.push(sec.getAttribute("id")); 
    });
} 

// 2. Create navigation items dynamically based on section data
function createNavMenu(){
    for (let i = 0; i < sectionNames.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        navbar.appendChild(li);
        li.appendChild(a);
        
        // Set text and styling for links
        let text = document.createTextNode(sectionNames[i]);
        a.appendChild(text);
        a.style.color = "black";
        
        // Link to corresponding section by ID
        a.setAttribute("href", "#" + sectionIds[i]);
        
        // Add event listener for smooth scroll
        a.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            document.getElementById(sectionIds[i]).scrollIntoView({
                behavior: "smooth"
            });
        });
    }
}

// 3. Get position of each section for viewport detection
function getSectionPositions(){
    sections.forEach((sec) => {
        sectionPositions.push(sec.getBoundingClientRect().top);
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// 4. Add class 'your-active-class' to section when it's near the top of the viewport
function highlightSectionInView() {
    let currentSectionIndex = -1;

    sections.forEach((sec, index) => {
        let rect = sec.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            currentSectionIndex = index;
        }
    });

    // Remove 'your-active-class' from all sections
    sections.forEach((sec) => {
        sec.classList.remove("your-active-class");
    });

    // Add 'your-active-class' to the currently active section
    if (currentSectionIndex !== -1) {
        sections[currentSectionIndex].classList.add("your-active-class");
    }
}

// 5. Add 'active' class to corresponding nav item when section is in view
function highlightNavLink() {
    let currentSectionIndex = -1;

    sections.forEach((sec, index) => {
        let rect = sec.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            currentSectionIndex = index;
        }
    });

    // Remove 'active' class from all nav links
    let navLinks = navbar.querySelectorAll("a");
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });

    // Add 'active' class to the corresponding nav link
    if (currentSectionIndex !== -1) {
        navLinks[currentSectionIndex].classList.add("active");
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// 6. Listen for scroll event to highlight section and nav link
window.addEventListener("scroll", function() {
    highlightSectionInView();
    highlightNavLink();
});

/**
 * Build menu and add smooth scroll functionality
 */
getDataFromSection();
createNavMenu();
getSectionPositions();
highlightSectionInView();
highlightNavLink();
