import { locale } from "user-settings";

/* Import language */
const langCode = locale['language'].split('-')[0];

/* ENGLISH (default) */
let langDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let langMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/* GERMAN */
if (langCode === 'de') {
  let langDays = ["SON", "MON", "DIE", "MIT", "DON", "FRE", "SAM"];
  let langMonths = ["JAN", "FEB", "MAR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"];
}

/* FRENCH */
if (langCode === 'fr') {
  let langDays = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
  let langMonths = ["JAN", "FEV", "MAR", "APR", "MAI", "JUN", "JUL", "AOU", "SEP", "OCT", "NOV", "DEC"];
}

/* SPANISH */
if (langCode === 'es') {
  let langDays = ["DOM", "LUN", "MAR", "MIE", "JEU", "VIE", "SAB"];
  let langMonths = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
}

/* ITALIAN */
if (langCode === 'it') {
  let langDays = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
  let langMonths = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];
}

/* Export */
export let days = langDays
export let months = langMonths
