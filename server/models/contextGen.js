const contextData = require('./context.js');
const contextValue = require('./contextValues');
const calculatedContext = require('./calculator');
const punct = require('./punctuationCalc');
const keyGrabber = require('./contextKeys');
// message is an array of words given to us by the user
// context is the message context

module.exports = function(message, context, cb) {
  var contexts = [];
  console.log("1");
  contexts = keyGrabber(message, context, contextData);
  console.log("2");
  if (contexts.length === 0) {
    console.log("3");
    cb(null, context, 'statement');
  } else if (contexts.length === 1) {
    console.log("4");
    var calculatedPunctuation = punct(contexts[0]);
    cb(contexts[0], context, calculatedPunctuation);
  } else if (contexts.length > 1) {
    console.log("5");
    var calculatedContext = calcContext(context);
    cb(calculatedContext, context, "statement");
  }
};





