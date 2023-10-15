"use strict";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

//Timer
countTimer("22 march 2023");

//Menu
toggleMenu();

//Popup
togglePopup();

//Tabs
tabs();

// Slider
slider();

//Calc
calc(100);

// send-ajax-form
sendForm();
