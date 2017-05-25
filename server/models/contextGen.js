const contextData = require('./context.js');
// message is an array of words given to us by the user
// context is the message context

module.exports = function(message, context, cb) {
  var contexts = [];
  for (let i = 0; i < message.length; i++) {
    for (let key in contextData) {
      for (let k = 0; k < contextData[key][k]; k++) {
        if (message[i] === contextData[key][k]) {
          if (contexts.indexOf(contextData[key]) === -1) {
            contexts.push(contextData[key]);
          }
        }
      }
    }
  }

  if (contexts.length === 0) {
    cb(null, context, 'statement');
  } else if (contexts.length === 1) {
    var calculatedPunctuation = punct(contexts[0]);
    cb(contexts[0], context, calculatedPunctuation);
  } else if (contexts.length > 1) {

  }

};


var punct = function(statement) {
  
};

