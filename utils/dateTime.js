
var date = new Date();

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

function getLocalDateAndTime_AU() {
  	return date.toLocaleDateString("en-AU", options)
}

function getLocalDateAndTime() {
  	return date.toLocaleDateString("en", options)
}

function printDateAndTime() {
    console.log(
        date.toLocaleDateString("en", options) //en is language option, you may specify.. en-AU
    );
}

module.exports = { getLocalDateAndTime , getLocalDateAndTime_AU , printDateAndTime};    
