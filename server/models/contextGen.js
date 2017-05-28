const contextData = require('./context.js');
const contextValue = require('./contextValues');
// const calculatedContext = require('./calculator');
const punct = require('./punctuationCalc');
const keyGrabber = require('./contextKeys');
// message is an array of words given to us by the user
// context is the message context
var calculatedContext;

module.exports.punctuation = function(wordArray) {
  console.log('in punct');
  var found = false;
  question = ['why', 'when', 'where', '?', 'can'],
  wordArray.forEach(function(word) {
    console.log(word);
    if (question.includes(word)) {
      console.log('found a question');
      found = true;
    }
  });
  return found ? 'question' : 'statement';
};

module.exports.contextGen = function(message, expectedNextContext, cb) {

  // module.exports.punctuation(['hello']);


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
// if(contexts[0] === 'restart') {
//   cb('restart')
// }
// else 
  if(contexts[0] === 'peopleCount') {
    var string;

    var num = parseInt(message[0]);
    var large = Math.ceil((num + 1) / 3);
    var medium = (num + 1) % 3;
    if(num === 0) string = '1 medium pizza';
    else if(medium !== 0) string = large + ' large and 1 medium pizzas';
    else string = large + ' large pizzas';
    cb(contexts[0], expectedNextContext, [string]);
  }
  else if(contexts.length === 0 && expectedNextContext === 'totalPizzas') {
    cb('totalPizzas', expectedNextContext, []);
  }
  else if(contexts.length === 0 && expectedNextContext === 'newOrder') {
     cb('newOrder', expectedNextContext,[]);

  } else if (contexts.length === 0) {

    cb(null, expectedNextContext, []);

    // if (contexts[0] === 'assertion') {
    //   contexts[0] = expectedNextContext;
    // }
    var calculatedPunctuation = module.exports.punctuation(message);
    console.log('calculatedPunction ', calculatedPunctuation);
    cb(contexts[0], expectedNextContext, []);

  } else if (contexts.length > 1) {

    var calculatedContext = '';
    if (contexts.includes(expectedNextContext)) {
      calculatedContext = expectedNextcontext;
    } 
    else if(contexts.includes('assertion')) {
      calculatedContext = expectedNextContext;
    }
    else {
      calculatedContext = null;
    }
    cb(calculatedContext, context, []);
  }
};
