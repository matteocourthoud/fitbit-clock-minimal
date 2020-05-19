/*
  A simple battery icon that overwrites the original one
  Callback should be used to update your UI.
*/

import { battery } from "power";

let batteryCallback;

export function initialize(callback) {
  batteryCallback = callback;
  updateBattery();
  battery.onchange = () => updateBattery();
}

function updateBattery() {
  
  let batteryString = ";";
  let hrefString = "";
  let widthInt = 0;
  
  batteryString = `${battery.chargeLevel}%`;
  
  if (battery.chargeLevel>90) {
    hrefString = "images/battery_green_.png";
    widthInt = 26;
  } else if (battery.chargeLevel>16) {
    hrefString = "images/battery_green_short_.png";
    widthInt = Math.floor(0.25*battery.chargeLevel)
  }
  
  batteryCallback({text: batteryString, href: hrefString, width: widthInt});
    
}
