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

export default tabs;
