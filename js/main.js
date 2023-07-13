// Carousel //

$('#myCarousel').carousel({
    interval: 2500
});

$('.carousel .carousel-item').each(function () {
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});


// Check window width and height

var w = window.innerWidth;
var h = window.innerHeight;
console.log("Browser width: " + w + ", height: " + h + ".");

// Display mobile fil //

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Mobile search modal pop up

function toggleSearch() {
  var modal = document.getElementById("myModal");
  modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

function closeSearch() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Filter Elements

const carouselData = [
  {
    imageUrl: "images/image_1.jpg",
    name: "hannon"
  },
  {
    imageUrl: "images/image_2.jpg",
    name: "selfcare"
  },
  {
    imageUrl: "images/image_3.jpg",
    name: "pain"
  },
  {
    imageUrl: "images/image_4.jpg",
    name: "selfcare"
  },
  {
    imageUrl: "images/image_5.jpg",
    name: "hepilor"
  }
];

const items = [...carouselData];

let showAmount = 4;
let currentIndex = 0;
let isCarouselPaused = false;

function updateShowAmount() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1050) {
    showAmount = Math.min(items.length, 4);
  } else if (screenWidth >= 700) {
    showAmount = Math.min(items.length, 2);
  } else {
    showAmount = Math.min(items.length, 1);
  }
}

function adjustShowAmountOnResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateShowAmount();
    updateCarousel();
  }, 200);
}

let resizeTimeout;
window.addEventListener("resize", adjustShowAmountOnResize);


function pauseCarousel() {
  isCarouselPaused = true;
}

function resumeCarousel() {
  isCarouselPaused = false;
}

function getItemFromIndex(index) {
  return items[index % items.length];
}



function makePretty(item) {
  return `<div><img class="imglink" src="${item.imageUrl}" alt="${item.name}"></img></div>`;
}

function filter(filteritem) {
  const filteredItems = carouselData.filter(item => item.name === filteritem);
  items.length = 0;
  Array.prototype.push.apply(items, filteredItems);
  updateShowAmount();
  updateCarousel();
}

function showAll() {
  items.length = 0;
  Array.prototype.push.apply(items, carouselData);
  updateShowAmount();
  updateCarousel();
}

function updateCarousel() {
  if (isCarouselPaused) {
    return; // Exit if carousel is paused
  }

  let html = "";
  for (let i = 0; i < showAmount; i++) {
    const itemIndex = (currentIndex + i) % items.length;
    html += makePretty(items[itemIndex]);
  }
  document.querySelector("#carousel").innerHTML = html;
}

function moveCarousel(direction) {
  if (isCarouselPaused) {
    return; // Exit if carousel is paused
  }

  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  } else if (currentIndex >= items.length) {
    currentIndex = 0;
  }
  updateCarousel();
}

function showAppContainer() {
  const appContainer = document.querySelector(".appcontainer");
  const carouselSearch = document.querySelector("carouselsearch");
  appContainer.style.display = "flex";
  carouselSearch.style.display = "none";
}

function startCarousel() {
  setInterval(() => {
    moveCarousel(1);
  }, 2500);
}

updateShowAmount();
updateCarousel();
startCarousel();

// Event listeners for hover
const carouselElement = document.querySelector("#carousel");
carouselElement.addEventListener("mouseenter", pauseCarousel);
carouselElement.addEventListener("mouseleave", resumeCarousel);

// showAppContainer function to the button click events
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
  button.addEventListener("click", showAppContainer);
});


// DESKTOP SHOPPING DROPDOWN

function toggleDropdown(dropdownName) {
  document.getElementById(dropdownName).classList.toggle("show");
}

// Close the dropdowns if the user clicks outside
document.addEventListener("click", function(event) {
  const dropdowns = document.querySelectorAll(".desktop-dropdown .dropdown-content.show");

  if (!event.target.matches(".desktop-dropbtn")) {
    dropdowns.forEach(function(openDropdown) {
      openDropdown.classList.remove("show");
    });
  }
});



// SEARCH BAR FILERING

var input = document.getElementById("myInput");
var filterDivs = document.getElementsByClassName("filterDiv");

function filterSelection(searchTerm) {
  for (var i = 0; i < filterDivs.length; i++) {
    var div = filterDivs[i];
    var text = div.textContent.toLowerCase();
    if (text.indexOf(searchTerm.toLowerCase()) > -1) {
      div.classList.add("searchshow");
    } else {
      div.classList.remove("searchshow");
    }
  }
}

function isInputEmpty() {
  return input.value.length === 0;
}

input.addEventListener("keyup", function() {
  if (isInputEmpty()) {
    for (var i = 0; i < filterDivs.length; i++) {
      var div = filterDivs[i];
      div.classList.remove("searchshow");
      document.querySelector(".search-carousel").style.display = "contents";
      document.querySelector(".desktop-carousel").style.display = "contents";
      document.querySelector(".banner-container").style.display = "contents";
      document.querySelector(".header").style.marginTop = ".5em";
    }
  } else {
    var searchTerm = input.value.toLowerCase();

    document.querySelector(".search-carousel").style.display = "none";
    document.querySelector(".desktop-carousel").style.display = "none";
    document.querySelector(".banner-container").style.display = "none";
    document.querySelector(".header").style.marginTop = "1.9em";

    filterSelection(searchTerm);

  }
});