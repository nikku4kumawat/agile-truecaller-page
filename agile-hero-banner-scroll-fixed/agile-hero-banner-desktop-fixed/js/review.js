/* ==============================
   AGILE REVIEW SECTION JS
   ============================== */

document.addEventListener("DOMContentLoaded", function () {

  const slider = document.getElementById("agreviewSlider");
  const track = document.getElementById("agreviewTrack");

  const prevBtn = document.querySelector(".agreview-prev");
  const nextBtn = document.querySelector(".agreview-next");

  if (!slider || !track) return;

  const cards = Array.from(
    track.querySelectorAll(".agreview-card")
  );

  if (!cards.length) return;


  /* ==============================
     CALL NUMBER
     ============================== */

  const phoneNumber = "918005677079";


  /* ==============================
     SLIDER SETTINGS
     ============================== */

  let currentIndex = 0;
  let autoSlideTimer = null;

  const AUTO_SLIDE_TIME = 2000;

  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;


  /* ==============================
     MOBILE CHECK
     ============================== */

  function isMobile() {
    return window.innerWidth <= 767;
  }


  /* ==============================
     UPDATE SLIDER
     ============================== */

  function updateSlider(animate = true) {

    if (!isMobile()) {

      track.style.transform = "translateX(0)";
      currentIndex = 0;

      return;
    }

    const sliderWidth = slider.clientWidth;

    track.style.transition = animate
      ? "transform 600ms cubic-bezier(.22, .61, .36, 1)"
      : "none";

    track.style.transform =
      "translate3d(-" +
      (currentIndex * sliderWidth) +
      "px, 0, 0)";
  }


  /* ==============================
     NEXT REVIEW
     ============================== */

  function nextReview() {

    if (!isMobile()) return;

    currentIndex++;

    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }

    updateSlider(true);
  }


  /* ==============================
     PREVIOUS REVIEW
     ============================== */

  function previousReview() {

    if (!isMobile()) return;

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = cards.length - 1;
    }

    updateSlider(true);
  }


  /* ==============================
     AUTO SLIDE
     ============================== */

  function startAutoSlide() {

    stopAutoSlide();

    if (!isMobile() || cards.length <= 1) {
      return;
    }

    autoSlideTimer = setInterval(function () {
      nextReview();
    }, AUTO_SLIDE_TIME);
  }


  function stopAutoSlide() {

    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }


  /* ==============================
     NEXT ARROW
     ============================== */

  if (nextBtn) {

    nextBtn.addEventListener("click", function (event) {

      event.preventDefault();

      nextReview();

      startAutoSlide();
    });
  }


  /* ==============================
     PREVIOUS ARROW
     ============================== */

  if (prevBtn) {

    prevBtn.addEventListener("click", function (event) {

      event.preventDefault();

      previousReview();

      startAutoSlide();
    });
  }


  /* ==============================
     REVIEW CARD CLICK
     MOBILE → PHONE CALL
     ============================== */

  cards.forEach(function (card) {

    card.addEventListener("click", function () {

      /*
       Only mobile cards are clickable
       for phone call.
      */

      if (!isMobile()) return;

      /*
       Do not call when user is swiping.
      */

      if (isSwiping) {
        isSwiping = false;
        return;
      }

      window.location.href = "tel:+" + phoneNumber;

    });


    /* Keyboard support */

    card.addEventListener("keydown", function (event) {

      if (!isMobile()) return;

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        window.location.href = "tel:+" + phoneNumber;
      }

    });

  });


  /* ==============================
     TOUCH / SWIPE
     ANDROID + IPHONE
     ============================== */

  slider.addEventListener(
    "touchstart",
    function (event) {

      if (!isMobile()) return;

      touchStartX = event.touches[0].clientX;
      touchEndX = touchStartX;

      isSwiping = false;

      stopAutoSlide();

    },
    { passive: true }
  );


  slider.addEventListener(
    "touchmove",
    function (event) {

      if (!isMobile()) return;

      touchEndX = event.touches[0].clientX;

      if (
        Math.abs(touchEndX - touchStartX) > 10
      ) {

        isSwiping = true;
      }

    },
    { passive: true }
  );


  slider.addEventListener(
    "touchend",
    function () {

      if (!isMobile()) return;

      const swipeDistance =
        touchEndX - touchStartX;

      const minimumSwipe = 50;


      if (
        Math.abs(swipeDistance) >= minimumSwipe
      ) {

        if (swipeDistance < 0) {

          /* Swipe Left → Next */
          nextReview();

        } else {

          /* Swipe Right → Previous */
          previousReview();
        }
      }


      startAutoSlide();


      setTimeout(function () {
        isSwiping = false;
      }, 150);

    },
    { passive: true }
  );


  /* ==============================
     RESIZE
     ============================== */

  let resizeTimer;

  window.addEventListener("resize", function () {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {

      if (isMobile()) {

        updateSlider(false);
        startAutoSlide();

      } else {

        stopAutoSlide();

        currentIndex = 0;

        track.style.transform =
          "translateX(0)";
      }

    }, 150);

  });


  /* ==============================
     INITIAL LOAD
     ============================== */

  if (isMobile()) {

    updateSlider(false);
    startAutoSlide();

  } else {

    track.style.transform =
      "translateX(0)";
  }

});