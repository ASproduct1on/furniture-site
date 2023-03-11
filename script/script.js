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

  countTimer("10 march 2023");

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
});
