// Set function that clears the active class and adds it to the clicked element
function addActive(clearedItems, addedItem) {
  [...clearedItems].forEach((el) => el.classList.remove("active"));
  addedItem.classList.add("active");
}

// Set qs function
let qs = (element) => document.querySelector(element);
let qsa = (element) => document.querySelectorAll(element);

// Check if there is an color in local storage
let mainColors = localStorage.getItem("main-color");
if (mainColors)
  document.documentElement.style.setProperty("--main-color", mainColors);

// Select settings option
let settings = qs(".settings-box");
let optionIcon = qs(".gear i");

// Check if "open" class should be added
if (localStorage.getItem("gearOpen") === "open") {
  settings.classList.add("open");
  optionIcon.classList.add("fa-spin");
}

qs(".gear").addEventListener("click", () => {
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
const colorsLi = qsa(".colors-list li");

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

// Auto change background and bullets
let inter;
if (localStorage.getItem("background-state") !== "false") {
  inter = setInterval(changeBackground, 4000);
  qs("#back-on").checked = true;
} else {
  qs("#back-off").checked = true;
}

if (localStorage.getItem("bullets-state") !== "false") {
  qs("#show-on").checked = true;
  qs(".nav-bullets").style.display = "block";
} else {
  qs("#show-off").checked = true;
  qs(".nav-bullets").style.display = "none";
}

function changeBackground() {
  let random = Math.ceil(Math.random() * 5);
  qs(
    ".landing-page"
  ).style.backgroundImage = `url("../Images/img-${random}.jpg")`;
}

// Background and bullets toggle handlers
function handleToggle(
  inputSelector,
  key,
  target = null,
  styleProp = null,
  valueOn = null,
  valueOff = null
) {
  qsa(inputSelector).forEach((input) => {
    input.addEventListener("change", (e) => {
      if (e.target.checked) {
        if (e.target.dataset.play === "on") {
          clearInterval(inter);
          inter = setInterval(changeBackground, 4000);
          localStorage.setItem(key, true);
        } else {
          clearInterval(inter);
          localStorage.setItem(key, false);
        }
        if (target && styleProp && valueOn && valueOff) {
          if (e.target.dataset.show === "on") {
            target.style[styleProp] = valueOn;
            localStorage.setItem(key, true);
          } else {
            target.style[styleProp] = valueOff;
            localStorage.setItem(key, false);
          }
        }
      }
    });
  });
}

handleToggle(".play-background input", "background-state");
handleToggle(
  ".show-bullets input",
  "bullets-state",
  qs(".nav-bullets"),
  "display",
  "block",
  "none"
);

// Reset options
qs(".reset-options").addEventListener("click", () => {
  ["main-color", "gearOpen", "bullets-state", "background-state"].forEach(
    (item) => {
      localStorage.removeItem(item);
    }
  );
  location.reload();
});

// Links Handling
const links = qsa(".links li");

links.forEach((link) => {
  link.addEventListener("click", () => {
    addActive(links, link);
    qs(`.${link.dataset.section}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Handling bullets
const bullets = qsa(".nav-bullets .bullet");

// add click event to bullets
bullets.forEach((bullet) => {
  bullet.addEventListener("click", () => {
    if (bullet.classList.contains("active")) {
      bullet.classList.remove("active");
    } else {
      addActive(bullets, bullet);
    }
    qs(`.${bullet.dataset.section}`).scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("scroll", () => {
  [...links, ...bullets].forEach((item) => {
    let top = qs(`.${item.dataset.section}`).offsetTop - 1;
    if (scrollY >= top) addActive(item.parentNode.children, item);
  });
});

// Mobile menu toggle
let bar = qs(".bar");

bar.addEventListener("click", () => {
  bar.classList.toggle("open");
  qs(".landing-page .links").classList.toggle("open");
});

// Skills fill animation
let counter = qsa(".skill .count");
let started = false;
window.onscroll = () => {
  let top = qs(".skills-cont").offsetTop;
  if (scrollY > top - 500 && !started) {
    qsa(".skill").forEach((skill, index) => {
      let goal = skill.dataset.fill;
      qsa(".skill .fill")[index].style.width = `${goal}%`;
      let count = 0;
      let inter = setInterval(() => {
        counter[index].innerText = ++count;
        if (counter[index].innerHTML == goal) clearInterval(inter);
      }, 1600 / goal);
      started = true;
    });
  }
};

// Open images in new window
qsa(".gallery img").forEach((image) => {
  image.addEventListener("click", function () {
    let overlay = document.createElement("div");
    overlay.className = "img-overlay";
    overlay.innerHTML = `<div class="image">${image.outerHTML}<div class="close"></div></div>`;
    document.body.appendChild(overlay);
    overlay.style.display = "block";
    setTimeout(() => (overlay.style.opacity = "1"), 0);
    document
      .querySelector(".close")
      .addEventListener("click", () => overlay.remove());
  });
});
