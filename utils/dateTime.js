var date = new Date();
const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

var options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  weekday: "short",
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'Australia/Sydney',
};

const optionsAU_DD_MMM_YYY = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

const optionsAU = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weekday: 'short',
  hour: 'numeric',
  minute: 'numeric'
};

function getLocalDateAndTime_AU_DD_MMM_YYY() {
  return date.toLocaleDateString("en-AU", optionsAU_DD_MMM_YYY)
}

function getLocalDateAndTime_AU() {
  return date.toLocaleDateString("en-AU", optionsAU)
}

function getLocalDateAndTime() {
  return date.toLocaleDateString("en", options)
}

function printDateAndTime() {
  console.log(
    date.toLocaleDateString("en", options) //en is language option, you may specify.. en-AU
  );
}

module.exports = {
  getLocalDateAndTime,
  getLocalDateAndTime_AU,
  printDateAndTime,
  getLocalDateAndTime_AU_DD_MMM_YYY
};
