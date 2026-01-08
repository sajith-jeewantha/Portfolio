// slider script
$(document).ready(function () {
  const $cont = $(".cont");
  const $slider = $(".slider");
  const $nav = $(".nav");
  const winW = $(window).width();
  const animSpd = 750;
  const distOfLetGo = winW * 0.2;
  let curSlide = 1;
  let animation = false;
  let autoScrollVar = true;
  let diff = 0;

  let arrayProjects = ["Amsterdam", "Rome", "New—York", "Singapore", "Prague"];
  let numOfCities = arrayProjects.length;
  let arrayProjectsDivided = [];

  arrayProjects.map((project) => {
    let length = project.length;
    let letters = Math.floor(length / 4);
    let exp = new RegExp(".{1," + letters + "}", "g");

    arrayProjectsDivided.push(project.match(exp));
  });

  let generateSlide = function (project) {
    let frag1 = $(document.createDocumentFragment());
    let frag2 = $(document.createDocumentFragment());
    const numSlide = arrayProjects.indexOf(arrayProjects[project]) + 1;
    const firstLetter = arrayProjectsDivided[project][0].charAt(0);

    const $slide =
      $(`<div data-target="${numSlide}" class="slide slide--${numSlide}">
							<div class="slide__darkbg slide--${numSlide}__darkbg"></div>
							<div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>
						</div>`);

    const letter = $(`<div class="slide__letter slide--${numSlide}__letter">
							${firstLetter}
						</div>`);

    for (
      let i = 0, length = arrayProjectsDivided[project].length;
      i < length;
      i++
    ) {
      const text = $(`<div class="slide__text slide__text--${i + 1}">
								${arrayProjectsDivided[project][i]}
							</div>`);
      frag1.append(text);
    }

    const navSlide = $(
      `<li data-target="${numSlide}" class="nav__slide nav__slide--${numSlide}"></li>`
    );
    frag2.append(navSlide);
    $nav.append(frag2);

    $slide
      .find(`.slide--${numSlide}__text-wrapper`)
      .append(letter)
      .append(frag1);
    $slider.append($slide);

    if (arrayProjects[project].length <= 4) {
      $(".slide--" + numSlide)
        .find(".slide__text")
        .css("font-size", "12vw");
    }
  };

  for (let i = 0, length = numOfCities; i < length; i++) {
    generateSlide(i);
  }

  $(".nav__slide--1").addClass("nav-active");

  // Navigation
  function bullets(dir) {
    $(".nav__slide--" + curSlide).removeClass("nav-active");
    $(".nav__slide--" + dir).addClass("nav-active");
  }

  function timeout() {
    animation = false;
  }

  function pagination(direction) {
    animation = true;
    diff = 0;
    $slider.addClass("animation");
    $slider.css({
      transform: "translate3d(-" + (curSlide - direction) * 100 + "%, 0, 0)",
    });

    $slider.find(".slide__darkbg").css({
      transform: "translate3d(" + (curSlide - direction) * 50 + "%, 0, 0)",
    });

    $slider.find(".slide__letter").css({
      transform: "translate3d(0, 0, 0)",
    });

    $slider.find(".slide__text").css({
      transform: "translate3d(0, 0, 0)",
    });
  }

  function navigateRight() {
    if (!autoScrollVar) return;
    if (curSlide >= numOfCities) return;
    pagination(0);
    setTimeout(timeout, animSpd);
    bullets(curSlide + 1);
    curSlide++;
  }

  function navigateLeft() {
    if (curSlide <= 1) return;
    pagination(2);
    setTimeout(timeout, animSpd);
    bullets(curSlide - 1);
    curSlide--;
  }

  function toDefault() {
    pagination(1);
    setTimeout(timeout, animSpd);
  }

  // Events
  $(document).on("mousedown touchstart", ".slide", function (e) {
    if (animation) return;
    let target = +$(this).attr("data-target");
    let startX = e.pageX || e.originalEvent.touches[0].pageX;
    $slider.removeClass("animation");

    $(document).on("mousemove touchmove", function (e) {
      let x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = startX - x;
      if ((target === 1 && diff < 0) || (target === numOfCities && diff > 0))
        return;

      $slider.css({
        transform:
          "translate3d(-" + ((curSlide - 1) * 100 + diff / 30) + "%, 0, 0)",
      });

      $slider.find(".slide__darkbg").css({
        transform:
          "translate3d(" + ((curSlide - 1) * 50 + diff / 60) + "%, 0, 0)",
      });

      $slider.find(".slide__letter").css({
        transform: "translate3d(" + diff / 60 + "vw, 0, 0)",
      });

      $slider.find(".slide__text").css({
        transform: "translate3d(" + diff / 15 + "px, 0, 0)",
      });
    });
  });

  $(document).on("mouseup touchend", function (e) {
    $(document).off("mousemove touchmove");

    if (animation) return;

    if (diff >= distOfLetGo) {
      navigateRight();
    } else if (diff <= -distOfLetGo) {
      navigateLeft();
    } else {
      toDefault();
    }
  });

  $(document).on("click", ".nav__slide:not(.nav-active)", function () {
    let target = +$(this).attr("data-target");
    bullets(target);
    curSlide = target;
    pagination(1);
  });

  $(document).on("click", ".side-nav", function () {
    let target = $(this).attr("data-target");

    if (target === "right") navigateRight();
    if (target === "left") navigateLeft();
  });

  $(document).on("keydown", function (e) {
    if (e.which === 39) navigateRight();
    if (e.which === 37) navigateLeft();
  });

  $(document).on("mousewheel DOMMouseScroll", function (e) {
    if (animation) return;
    let delta = e.originalEvent.wheelDelta;

    if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();
    if (delta < 0 || e.originalEvent.detail > 0) navigateRight();
  });
});

// Add intersection observer for scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(
    ".animate-slide-up, .animate-fade-in"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Add a subtle animation to cards on page load
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".group");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 30);
  });
});

// Navigation menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  let isMenuOpen = false;

  menuBtn.addEventListener("click", function () {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      // Open menu
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.remove("animate-slideUp");
      mobileMenu.classList.add("animate-slideDown");
      menuBtn.classList.add("hamburger-active");
    } else {
      // Close menu
      mobileMenu.classList.remove("animate-slideDown");
      mobileMenu.classList.add("animate-slideUp");
      menuBtn.classList.remove("hamburger-active");

      // Hide after animation completes
      setTimeout(() => {
        if (!isMenuOpen) {
          mobileMenu.classList.add("hidden");
        }
      }, 300);
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      isMenuOpen &&
      !mobileMenu.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {
      isMenuOpen = false;
      mobileMenu.classList.remove("animate-slideDown");
      mobileMenu.classList.add("animate-slideUp");
      menuBtn.classList.remove("hamburger-active");

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);
    }
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      isMenuOpen = false;
      mobileMenu.classList.remove("animate-slideDown");
      mobileMenu.classList.add("animate-slideUp");
      menuBtn.classList.remove("hamburger-active");

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);
    });
  });

  // Add scroll effect to navbar
  let lastScroll = 0;
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove("shadow-lg");
      navbar.classList.add("shadow-sm");
    } else {
      navbar.classList.remove("shadow-sm");
      navbar.classList.add("shadow-lg");
    }

    lastScroll = currentScroll;
  });
});

// Filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.remove(
          "bg-primary-50",
          "border-primary-200",
          "text-primary-700"
        );
      });

      // Add active class to clicked button
      this.classList.add("active");
      this.classList.add(
        "bg-primary-50",
        "border-primary-200",
        "text-primary-700"
      );

      const filterValue = this.getAttribute("data-filter");

      // Show/hide projects based on filter
      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 10);
        } else {
          const categories = card.getAttribute("data-category").split(" ");
          if (categories.includes(filterValue)) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
            }, 10);
          } else {
            card.style.opacity = "0";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        }
      });
    });
  });

  // Add scroll animation for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all project cards for scroll animation
  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});


// Footer scripts

// Set current year in copyright
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Back to top functionality
document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show/hide back to top button based on scroll position
window.addEventListener("scroll", function () {
  const backToTopBtn = document.getElementById("backToTop");
  if (window.scrollY > 10) {
    backToTopBtn.classList.remove("opacity-0", "invisible");
    backToTopBtn.classList.add("opacity-100", "visible");
  } else {
    backToTopBtn.classList.remove("opacity-100", "visible");
    backToTopBtn.classList.add("opacity-0", "invisible");
  }
});

// Initialize back to top button as hidden
document.getElementById("backToTop").classList.add("opacity-0", "invisible");

// Newsletter form submission
document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (email && email.includes("@")) {
      // Show success message
      alert("Thank you for subscribing to the newsletter!");
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });

// Add social media hover colors
document.addEventListener("DOMContentLoaded", function () {
  const socialIcons = document.querySelectorAll(".social-icon");

  socialIcons.forEach((icon) => {
    // Add specific hover background colors based on platform
    const title = icon.getAttribute("title");
    if (title === "LinkedIn") {
      icon.addEventListener("mouseenter", () => {
        icon.style.setProperty("--hover-bg", "#0A66C2", "important");
      });
    } else if (title === "GitHub") {
      icon.addEventListener("mouseenter", () => {
        icon.style.setProperty("--hover-bg", "#333333", "important");
      });
    } else if (title === "Twitter") {
      icon.addEventListener("mouseenter", () => {
        icon.style.setProperty("--hover-bg", "#1DA1F2", "important");
      });
    } else if (title === "Instagram") {
      icon.addEventListener("mouseenter", () => {
        icon.style.setProperty("--hover-bg", "#E4405F", "important");
      });
    } else if (title === "YouTube") {
      icon.addEventListener("mouseenter", () => {
        icon.style.setProperty("--hover-bg", "#FF0000", "important");
      });
    } else if (title === "Facebook") {
      icon.addEventListener("mouseenter", () => {
        icon.style.setProperty("--hover-bg", "#1877F2", "important");
      });
    }

    // Reset on mouse leave
    icon.addEventListener("mouseleave", () => {
      icon.style.removeProperty("--hover-bg");
    });
  });

  // Add animation to social icons on page load
  setTimeout(() => {
    socialIcons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add("animate-float");
        icon.style.animationDelay = `${index * 0.1}s`;
      }, 100);
    });
  }, 500);
});
