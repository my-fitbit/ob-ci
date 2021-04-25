function getTitleCase(string) {

  var sentence = string.toLowerCase().split(' ');
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(' ');
}

function replace_withSpace(str) {
  return str.toLowerCase().split("_").join(' ');
}

module.exports = {
  getTitleCase,
  replace_withSpace
};