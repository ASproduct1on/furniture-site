window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      console.log(dateStop);
      return { timeRemaining, hours, minutes, seconds };
    }
    function updateClock() {
      let timer = getTimeRemaining();
      timerHours.textContent =
        timer.hours < 10 ? "0" + timer.hours : timer.hours;
      timerMinutes.textContent =
        timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
      timerSeconds.textContent =
        timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      } else {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }
    }
    updateClock();
  }

  countTimer("22 march 2023");

  //Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };
    btnMenu.addEventListener("click", handlerMenu);

    menu.addEventListener("click", (event) => {
      let target = event.target;
      if (target.tagName != "MENU") {
        handlerMenu();
      }
    });
  };

  toggleMenu();

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn");

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
      });
    });

    popup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");

        if (!target) {
          popup.style.display = "none";
        }
      }
    });
  };

  togglePopup();

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabConten = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      console.log(target);

      target = target.closest(".service-header-tab");
      console.log(target);

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabConten(i);
          }
        });
      }
    });
  };

  tabs();

  const slider = () => {
    const slideContent = document.querySelector(".portfolio-content"),
      slideItem = document.querySelectorAll(".portfolio-item");

    for (let i = 0; i < slideItem.length; i++) {
      const li = document.createElement("li");
      li.classList.add("dot");
      document.querySelector(".portfolio-dots").append(li);
    }

    const slideDot = document.querySelectorAll(".dot");

    let countSlide = 0;
    let interval;

    const prevSlide = (item, index, classStr) => {
      item[index].classList.remove(classStr);
    };

    const nextSlide = (item, index, classStr) => {
      item[index].classList.add(classStr);
    };

    const autoPlaySlide = () => {
      prevSlide(slideItem, countSlide, "portfolio-item-active");
      prevSlide(slideDot, countSlide, "dot-active");
      countSlide++;
      if (countSlide >= slideItem.length) {
        countSlide = 0;
      }
      nextSlide(slideItem, countSlide, "portfolio-item-active");
      nextSlide(slideDot, countSlide, "dot-active");
    };

    const startSlide = (time = 2500) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    startSlide();

    slideContent.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });

    slideContent.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    slideContent.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slideItem, countSlide, "portfolio-item-active");
      prevSlide(slideDot, countSlide, "dot-active");

      if (target.matches("#arrow-left")) {
        if (countSlide > 0) {
          countSlide--;
        } else {
          countSlide = slideItem.length - 1;
        }
      } else if (target.matches("#arrow-right")) {
        if (countSlide < slideItem.length - 1) {
          countSlide++;
        } else {
          countSlide = 0;
        }
      } else if (target.matches(".dot")) {
        slideDot.forEach((item, index) => {
          if (item === target) {
            countSlide = index;
          }
        });
      }

      nextSlide(slideItem, countSlide, "portfolio-item-active");
      nextSlide(slideDot, countSlide, "dot-active");
    });
  };

  slider();

  //Calc

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.calc < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;

      if (target.matches("select") || target.matches("input")) {
        countSum();
      }
    });
  };

  calc(100);
});
