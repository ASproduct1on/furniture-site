// Slider

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

export default slider;
