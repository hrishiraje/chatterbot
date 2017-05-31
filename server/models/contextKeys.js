var contextData = require('./contextValues');

module.exports = (message) => {
  var contexts = [];
  for (var i = 0; i < message.length; i++) {
    for (var key in contextData) {
      for (var k = 0; k < contextData[key][k]; k++) {
        if (message[i] === contextData[key][k]) {
          if (contexts.indexOf(contextData[key]) === -1) {
            contexts.push(key);
          }
        }
      }
    }
  }
  console.log(contexts);
  return contexts;   
};
