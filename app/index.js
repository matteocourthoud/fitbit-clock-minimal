import * as util from "./utils";
import document from "document";
import { user } from "user-profile";
import { preferences } from "user-settings";
import { display } from "display";
import { clock } from "clock";
import { battery } from "power";
import { days, months } from "./locales/en.js";
import { HeartRateSensor } from "heart-rate";




/* --------- CLOCK ---------- */
const txtTime = document.getElementById("txtTime");
const txtDate = document.getElementById("txtDate");

clock.granularity = "minutes";

function updateClock(evt) {
  let today = evt.date;
  let dayName = days[today.getDay()];
  let month = util.zeroPad(today.getMonth() + 1);
  let monthName = months[today.getMonth()];
  let dayNumber = util.zeroPad(today.getDate());
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());

  txtTime.text = `${hours}:${mins}`;
  txtDate.text = `${dayName} ${monthName} ${dayNumber}`;
}




/* -------- BATTERY -------- */
const txtBattery = document.getElementById("txtBattery");
const iconBattery = document.getElementById("iconBattery");
const fillBattery = document.getElementById("fillBattery");

// Update battery
function updateBattery() {
  
  txtBattery.text = `${battery.chargeLevel}%`;
  
  if (battery.chargeLevel>90) {
    fillBattery.href = "images/battery_green_.png";
    fillBattery.width = 26;
  } else if (battery.chargeLevel>16) {
    fillBattery.href = "images/battery_green_short_.png";
    fillBattery.width = Math.floor(0.25*battery.chargeLevel)
  }    
}



/* -------- HRM ------------- */
const txtHRM = document.getElementById("txtHRM");
const iconHRM = document.getElementById("iconHRM");
const imgHRM = iconHRM.getElementById("icon");

// Update HRM
function updateHRM(hrm) {
  txtHRM.text = `${hrm.heartRate}`;
  //console.log(`Current heart rate: ${hrm.heartRate}`);
  const zone = user.heartRateZone(hrm.heartRate || 0);
  if (zone === "out-of-range") {
    imgHRM.href = "images/heart_open.png";
  } else {
    imgHRM.href = "images/heart_solid.png";
  }
  if (txtHRM.text !== "--") {
    iconHRM.animate("highlight");
  }
}



/* -------- ICONS -------- */
function changeVisibility(visibility) {
  txtDate.style.visibility = visibility;
  txtHRM.style.visibility = visibility;
  imgHRM.style.visibility = visibility;
  txtBattery.style.visibility = visibility;
  iconBattery.style.visibility = visibility;
  fillBattery.style.visibility = visibility;
}





/* --------- GENERAL ---------- */

// Event listeners
clock.ontick = (evt) => updateClock(evt);
battery.onchange = () => updateBattery();  
const hrm = new HeartRateSensor();
hrm.start();
hrm.onreading = () => updateHRM(hrm); 
txtTime.onclick = () => updateIcons(hrm); 

// Automatically stop the sensor when the display is turned off to conserve battery
display.addEventListener("change", (evt) => {
  if (display.on && txtDate.style.visibility == 'visible') {
    hrm.start();
    updateBattery();
    updateHRM(hrm);
   } else {
     hrm.stop();
   }
});

// Automatically stop the sensor when the icons are hidden to conserve battery
txtTime.onclick = function(e) {
  if (txtDate.style.visibility == 'hidden') {
    hrm.start();
    updateBattery();
    updateHRM(hrm);
    changeVisibility('visible')
  } else {
    changeVisibility('hidden')
    hrm.stop();
  }
}



 
