const contextData = require('./context.js');
const contextValue = require('./contextValues');
const calculatedContext = require('./calculator');
const punct = require('./punctuationCalc');
const keyGrabber = require('./contextKeys');
// message is an array of words given to us by the user
// context is the message context

module.exports = function(message, context, cb) {

  var contexts = [];
  for (let i = 0; i < message.length; i++) {
    for (let key in contextData) {
      for (let k = 0; k < contextData[key].length; k++) {
        if (message[i] === contextData[key][k]) {
          if (contexts.indexOf(contextData[key]) === -1) {
            contexts.push(key);
          }
        }
      }
    }
  }

  console.log(contexts);  

  if (contexts.length === 0) {

    cb(null, context, 'statement');

  } else if (contexts.length === 1) {

    if (contexts[0] === 'assertion') {
      contexts[0] = context;
    }
    var calculatedPunctuation = 'statement';
    cb(contexts[0], context, calculatedPunctuation);

  } else if (contexts.length > 1) {
    var sum = 0;
    var calculation = 0;

    contexts.forEach((contextname) => {
      sum += contextValue[contextname];
    });

    calculation = Math.round(sum / contexts.length);
    var returnContext;

    for (let key in contextValue) {
      if (contextValue[key] === calculation) {
        returnContext = key;
      }
    }
    if (calculatedContext === 'assertion') {
      calculatedContext = returnContext;
    }
    console.log('What we are sending in fam', calculatedContext, context);
    cb(calculatedContext, context, 'statement');
  }
};





