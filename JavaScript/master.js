// Get Slider Items [Array Of Images]
let silderImages = Array.from(document.querySelectorAll(".slider-container img")),
    // Get Number Of Sildes
    sildesCount = silderImages.length;

// Set Current Silde
let currentSilde = 1;

// Silde Number On Screen
let sildeNumber = document.getElementById("slider-number");

// Next And Previous Buttons
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

// Cretae The Main UL Element
let paginationElements = document.createElement("ul");

// Set ID On Created UL Element
paginationElements.setAttribute("id", "padination-ul");

// Create List Items Based On Slides Count
for (let i = 1; i <= sildesCount; i++) {

    // Create The Li
    let paginationItems = document.createElement("li");

    // Set Custom Attribute
    paginationItems.setAttribute("data-index", i); // data-index = "1" then 2 then 3 ect...

    // Set Item Content
    paginationItems.appendChild(document.createTextNode(i));

    // Append Items To The Main Ul List
    paginationElements.appendChild(paginationItems);
};

// Add The Created Ul Element To The Page
let indicatorsBox = document.getElementById("indicators");
indicatorsBox.appendChild(paginationElements);

// Get The New Created UL .. We Created It In The Loop Above.
let padinationCreatedUl = document.getElementById("padination-ul");

// Get Pagination Items Array
let padinationBullets = Array.from(document.querySelectorAll("#padination-ul li"));

padinationBullets.forEach(li => {
    li.addEventListener("click", (ele) => {
        currentSilde = parseInt(ele.target.getAttribute("data-index"));
        theChecker();
    })
});

// Handle The Click Events For Next And Previous
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// Next Silde Function
function nextSlide() {

    if (!nextButton.classList.contains("disabled")) {
        currentSilde++;
        theChecker();
    }
};

// previous Silde Function
function prevSlide() {

    if (!prevButton.classList.contains("disabled")) {
        currentSilde--;
        theChecker();
    }
};

// Create The Checker Function
function theChecker() {

    // Set The Silde Number
    sildeNumber.textContent = "Slide #" + (currentSilde) + " Of " + (sildesCount);

    removeActive();

    // Set Active Class On Current Silde
    silderImages[currentSilde - 1].classList.add("active");

    // Set Active Class On Current Pagination Item
    padinationCreatedUl.children[currentSilde - 1].classList.add("active"); // children = li ..[currentSilde - 1] = [0].

    // Check If The Current Silde Is The First
    if (currentSilde == 1) {
        prevButton.classList.add("disabled");
    }
    else {
        prevButton.classList.remove("disabled");
    }

    // Check If The Current Silde Is The The Last => SlideCount Is The Last Image In The Array
    currentSilde == sildesCount ? nextButton.classList.add("disabled") : nextButton.classList.remove("disabled");
};

// Trigger The Checker Function
theChecker();

// Remove All Active Class From Images And Pagination Bullets
function removeActive() {
    // Loop Through Images
    silderImages.forEach(image => {
        image.classList.remove("active");
    });

    // Loop Through Pagination Bullets
    padinationBullets.forEach(li => {
        li.classList.remove("active");
    })
};

// Add Autoplay Functionality

let autoSlideInterval;

// Start Auto Slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

// Stop Auto Slide
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Add Hover Event Listeners
document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.slider-container').addEventListener('mouseleave', startAutoSlide);

// Trigger Auto Slide on Page Load
startAutoSlide();

// Enable The Swiping Scroll Functionality

let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide(); // Swipe left, move to the next slide
    }
    if (touchEndX > touchStartX) {
        prevSlide(); // Swipe right, move to the previous slide
    }
}
