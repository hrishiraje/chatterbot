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


module.exports.contextGen = function(message, context, cb) {
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

  var punct = module.exports.punctuation(message);

  if (contexts.length === 0) {
    cb(null, context, punct);
  } else if (contexts.length === 1) {
    cb(contexts[0], context, punct);
  } else {
    var calculatedContext = '';
    if (contexts.includes(context)) {
      calculatedContext = context;
    } else {
      calculatedContext = null;
    }
    cb(calculatedContext, context, punct);
  }

};







// module.exports.contextGen = function(message, context, cb) {

//   // module.exports.punctuation(['hello']);

//   var contexts = [];
//   for (let i = 0; i < message.length; i++) {
//     for (let key in contextData) {
//       for (let k = 0; k < contextData[key].length; k++) {
//         if (message[i] === contextData[key][k]) {
//           if (contexts.indexOf(contextData[key]) === -1) {
//             contexts.push(key);
//           }
//         }
//       }
//     }
//   }

//   console.log(contexts);  

//   if (contexts.length === 0) {

//     cb(null, context, 'statement');

//   } else if (contexts.length === 1) {

//     if (contexts[0] === 'assertion') {
//       contexts[0] = context;
//     }
    
//     // else if (contexts[0] === 'negation') {
//     //   contexts[0] = 'restart';
//     // }

//     var calculatedPunctuation = module.exports.punctuation(message);
//     console.log('calculatedPunction ', calculatedPunctuation);
//     cb(contexts[0], context, calculatedPunctuation);

//   } else if (contexts.length > 1) {
//     // var sum = 0;
//     // var calculation = 0;

//     // contexts.forEach((contextname) => {
//     //   sum += contextValue[contextname];
//     // });

//     // calculation = Math.round(sum / contexts.length);
//     // var returnContext;

//     // for (let key in contextValue) {
//     //   if (contextValue[key] === calculation) {
//     //     returnContext = key;
//     //   }
//     // }


//     // if (calculatedContext === 'assertion') {
//     //   calculatedContext = returnContext;
//     // }
//     var calculatedContext = '';
//     if (contexts.includes(context)) {
//       calculatedContext = context;
//     } else {
//       calculatedContext = null;
//     }
//     console.log('What we are sending in fam', calculatedContext, context);


//     cb(calculatedContext, context, 'statement');
//   }
// };





