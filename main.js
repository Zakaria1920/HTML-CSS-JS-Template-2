// Set function that clears the active class and adds it to the clicked element
function addActive(clearedItems, addedItem) {
  clearedItems.forEach((el) => el.classList.remove("active"));
  addedItem.classList.add("active");
}

// Check if there is an color in local storage
let mainColors = localStorage.getItem("main-color");
if (mainColors)
  document.documentElement.style.setProperty("--main-color", mainColors);

// Select settings option
let settings = document.querySelector(".settings-box");
let optionToggle = document.querySelector(".gear");
let optionIcon = document.querySelector(".gear i");

// Check if "open" class should be added
let gearOpen = localStorage.getItem("gearOpen");

if (gearOpen === "open") {
  settings.classList.add("open");
  optionIcon.classList.add("fa-spin");
}

optionToggle.addEventListener("click", () => {
  settings.classList.toggle("open");
  optionIcon.classList.toggle("fa-spin");

  // Save the state of the "open" class
  if (settings.classList.contains("open")) {
    localStorage.setItem("gearOpen", "open");
  } else {
    localStorage.removeItem("gearOpen");
  }
});

// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", function () {
    addActive(colorsLi, this);
    document.documentElement.style.setProperty(
      "--main-color",
      this.dataset.color
    );
    localStorage.setItem("main-color", this.dataset.color);
  });
});

// Background switch labels
const backgroundSwitch = document.querySelectorAll(".play-background input");

// Optional: Ensure switch can be toggled with the input itself
backgroundSwitch.forEach((input) => {
  input.addEventListener("change", (event) => {
    let target = event.target;
    if (target.checked) {
      if (target.dataset.play === "on") {
        clearInterval(inter);
        inter = setInterval(changeBackground, 4000);
        localStorage.setItem("background-state", true);
      } else if (target.dataset.play === "off") {
        clearInterval(inter);
        localStorage.setItem("background-state", false);
      }
    }
  });
});

const bulletsSwitch = document.querySelectorAll(".show-bullets input");
const bulletsContainer = document.querySelector(".nav-bullets");

bulletsSwitch.forEach((input) => {
  input.addEventListener("change", (event) => {
    let target = event.target;
    if (target.checked) {
      if (target.dataset.show === "on") {
        bulletsContainer.style.display = "block";
        localStorage.setItem("bullets-state", true);
      } else if (target.dataset.show === "off") {
        bulletsContainer.style.display = "none";
        localStorage.setItem("bullets-state", false);
      }
    }
  });
});

// Check if there is an value in local storage
let bulletsState = localStorage.getItem("bullets-state") !== "false";

if (bulletsState) {
  document.querySelector("#three").checked = true;
  bulletsContainer.style.display = "block";
} else {
  document.querySelector("#four").checked = true;
  bulletsContainer.style.display = "none";
}

// Set reset options button
let resetOptions = document.querySelector(".reset-options");
resetOptions.addEventListener("click", () => {
  localStorage.removeItem("main-color");
  localStorage.removeItem("gearOpen");
  localStorage.removeItem("bullets-state");
  localStorage.removeItem("background-state");
  location.reload();
});

// Links Handling
const links = document.querySelectorAll(".links li");

links.forEach((link) => {
  link.addEventListener("click", () => {
    addActive(links, link);
    document.querySelector(`.${link.dataset.section}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll Handling
window.addEventListener("scroll", () => {
  links.forEach((link) => {
    let top = document.querySelector(`.${link.dataset.section}`).offsetTop - 1;
    if (scrollY >= top) {
      addActive(links, link);
    }
  });
});

// Handling bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet");
let tooltips = document.querySelectorAll(".nav-bullets .bullet .tooltip");

// add click event to bullets
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", (e) => {
    if (!e.target.classList.contains("tooltip")) {
      if (bullet.classList.contains("active")) {
        bullet.classList.remove("active");
        tooltips[index].classList.remove("show");
      } else {
        bullets.forEach((bullet) => bullet.classList.remove("active"));
        tooltips.forEach((tooltip) => tooltip.classList.remove("show"));
        bullet.classList.add("active");
        tooltips[index].classList.add("show");
      }
    }
  });
});

// add click event to tooltips
tooltips.forEach((tooltip) => {
  tooltip.addEventListener("click", () => {
    scroll({
      behavior: "smooth",
      top: document.querySelector(`.${tooltip.dataset.section}`).offsetTop,
    });
  });
});

// Add click event to bar element to show list of pages
let bar = document.querySelector(".bar");
let listLinks = document.querySelector(".landing-page .links");

bar.addEventListener("click", () => {
  bar.classList.toggle("open");
  listLinks.classList.toggle("open");
});

// click anywhere to hide the menu
document.addEventListener("click", (event) => {
  let target = event.target;
  let parent = target.parentElement;
  if (
    bar.classList.contains("open") &&
    listLinks.classList.contains("open") &&
    !target.classList.contains("open") &&
    !parent.classList.contains("open")
  ) {
    bar.classList.toggle("open");
    listLinks.classList.toggle("open");
  }
});

// Select landing page
const landingPage = document.querySelector(".landing-page");

// Function to change background
const changeBackground = () => {
  const random = Math.ceil(Math.random() * 5);
  landingPage.style.backgroundImage = `url("./Images/img-${random}.jpg")`;
};

// Retrieve and apply background state from localStorage
let state = localStorage.getItem("background-state") !== "false";

// Set interval for background change
let inter;

// Retrieve and apply background state from localStorage
if (state) {
  inter = setInterval(changeBackground, 4000);
  document.querySelector("input#one").checked = true;
} else {
  clearInterval(inter);
  document.querySelector("input#two").checked = true;
}

// Fill skills
let skillsContainer = document.querySelector(".skills-cont");
let skills = document.querySelectorAll(".skill");
let fills = document.querySelectorAll(".skill .fill");
let counts = document.querySelectorAll(".skill .count");
let started = false;

// Handling window scrolling
window.onscroll = () => {
  let top = skillsContainer.offsetTop;
  if (scrollY > top - 500) {
    if (!started) {
      skills.forEach((skill, index) => {
        let goal = skill.dataset.fill;
        fills[index].style.width = `${goal}%`;
        let inter = setInterval(() => {
          counts[index].innerText++;
          if (counts[index].innerHTML == goal) clearInterval(inter);
        }, 1600 / goal);
        started = true;
      });
    }
  }
};

// Open images in new window
let images = document.querySelectorAll(".gallery img");

images.forEach((image) => {
  image.addEventListener("click", function () {
    let overlay = document.createElement("div");
    overlay.className = "img-overlay";

    let image = document.createElement("div");
    image.className = "image";
    image.appendChild(this.cloneNode());

    let close = document.createElement("div");
    close.className = "close";

    image.appendChild(close);
    overlay.appendChild(image);
    document.body.appendChild(overlay);
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 0);
    close.addEventListener("click", () => {
      overlay.remove();
    });
  });
});
