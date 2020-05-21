/*
  A simple battery icon that overwrites the original one
  Callback should be used to update your UI.
*/



let batteryCallback;

export function initialize(callback) {
  batteryCallback = callback;
  updateBattery();
  battery.onchange = () => updateBattery();
}


