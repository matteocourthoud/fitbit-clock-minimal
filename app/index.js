import document from "document";

import * as Clock from "./clock";
import * as Battery from "./battery";
import * as HRM from "./hrm";



/* --------- CLOCK ---------- */
let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");

function clockCallback(data) {
  txtTime.text = data.time;
  txtDate.text = data.date;
}
Clock.initialize("minutes", "longDate", clockCallback);



/* -------- BATTERY -------- */
let txtBattery = document.getElementById("txtBattery");
let iconBattery = document.getElementById("iconBattery");
let fillBattery = document.getElementById("fillBattery");

function batteryCallback(data) {
  txtBattery.text = data.text;
  fillBattery.href = data.href;
  fillBattery.width = data.width;
}
Battery.initialize(batteryCallback);




/* -------- HRM ------------- */
let txtHRM = document.getElementById("txtHRM");
let iconHRM = document.getElementById("iconHRM");
let imgHRM = iconHRM.getElementById("icon");

function hrmCallback(data) {
  txtHRM.text = `${data.bpm}`;
  if (data.zone === "out-of-range") {
    imgHRM.href = "images/heart_open.png";
  } else {
    imgHRM.href = "images/heart_solid.png";
  }
  if (data.bpm !== "--") {
    iconHRM.animate("highlight");
  }
}
HRM.initialize(hrmCallback);



/* -------- HIDE -------- */
txtDate.style.visibility = 'hidden';
txtHRM.style.visibility = 'hidden';
imgHRM.style.visibility = 'hidden';
txtBattery.style.visibility = 'hidden';
iconBattery.style.visibility = 'hidden';
fillBattery.style.visibility = 'hidden';
txtTime.onclick = function(e) {
  if (txtDate.style.visibility == 'visible') {
    txtDate.style.visibility = 'hidden';
    txtHRM.style.visibility = 'hidden';
    imgHRM.style.visibility = 'hidden';
    txtBattery.style.visibility = 'hidden';
    iconBattery.style.visibility = 'hidden';
    fillBattery.style.visibility = 'hidden';
  } else {
    txtDate.style.visibility = "visible";
    txtHRM.style.visibility = 'visible';
    imgHRM.style.visibility = 'visible';
    txtBattery.style.visibility = 'visible';
    iconBattery.style.visibility = 'visible';
    fillBattery.style.visibility = 'visible';
  }
}