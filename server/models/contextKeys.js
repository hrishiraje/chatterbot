module.exports = (message, contexts, contextData) => {
  var contexts = [];
  for (let i = 0; i < message.length; i++) {
    for (let key in contextData) {
      for (let k = 0; k < contextData[key][k]; k++) {
        if (message[i] === contextData[key][k]) {
          if (contexts.indexOf(contextData[key]) === -1) {
            contexts.push(key);
          }
        }
      }
    }
  }
  return contexts;   
};