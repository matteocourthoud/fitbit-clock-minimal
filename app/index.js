import document from "document";

import * as Activity from "./activity";
import * as Clock from "./clock";
import * as Battery from "./battery";
import * as HRM from "./hrm";
import * as Settings from "./device-settings";

let background = document.getElementById("background");


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



/* -------- SETTINGS -------- */
/*
function settingsCallback(data) {
  if (!data) {
    return;
  }
  if (data.colorBackground) {
    background.style.fill = data.colorBackground;
  }
  if (data.colorDividers) {
    dividers.forEach(item => {
      item.style.fill = data.colorDividers;
    });
  }
  if (data.colorTime) {
    txtTime.style.fill = data.colorTime;
  }
  if (data.colorDate) {
    txtDate.style.fill = data.colorDate;
  }
  if (data.colorActivity) {
    statsCycleItems.forEach((item, index) => {
      let img = item.firstChild;
      let txt = img.nextSibling;
      img.style.fill = data.colorActivity;
      txt.style.fill = data.colorActivity;
    });
  }
  if (data.colorHRM) {
    txtHRM.style.fill = data.colorHRM;
  }
  if (data.colorImgHRM) {
    imgHRM.style.fill = data.colorImgHRM;
  }
}
Settings.initialize(settingsCallback);



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