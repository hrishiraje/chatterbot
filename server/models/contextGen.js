// const contextData = require('./context.js');
// const contextValue = require('./contextValues');
// // const calculatedContext = require('./calculator');
// const punct = require('./punctuationCalc');
// const keyGrabber = require('./contextKeys');
// // message is an array of words given to us by the user
// // context is the message context
// var calculatedContext;

// module.exports.punctuation = function(wordArray) {
//   console.log('in punct');
//   var found = false;
//   question = ['why', 'when', 'where', '?', 'can'],
//   wordArray.forEach(function(word) {
//     console.log(word);
//     if (question.includes(word)) {
//       console.log('found a question');
//       found = true;
//     }
//   });
//   return found ? 'question' : 'statement';
// };

// module.exports.contextGen = function(message, expectedNextContext, cb) {

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
// // if(contexts[0] === 'restart') {
// //   cb('restart')
// // }
// // else 
//   if(contexts.length === 0 && expectedNextContext === 'totalPizzas') {
//     cb('totalPizzas', expectedNextContext, 'statement');
//   }
//   else if(contexts.length === 0 && expectedNextContext === 'newOrder') {
//      cb('newOrder', expectedNextContext, 'statement');

//   } else if (contexts.length === 0) {

//     cb(null, expectedNextContext, 'statement');

//     // if (contexts[0] === 'assertion') {
//     //   contexts[0] = expectedNextContext;
//     // }
//     var calculatedPunctuation = module.exports.punctuation(message);
//     console.log('calculatedPunction ', calculatedPunctuation);
//     cb(contexts[0], expectedNextContext, calculatedPunctuation);

//   } else if (contexts.length > 1) {

//     var calculatedContext = '';
//     if (contexts.includes(expectedNextContext)) {
//       calculatedContext = expectedNextcontext;
//     } 
//     else if(contexts.includes('assertion')) {
//       calculatedContext = expectedNextContext;
//     }
//     else {
//       calculatedContext = null;
//     }
//     cb(calculatedContext, context, 'statement');
//   }
// };


//object coming from Contextgen giving calContext in string and expected next calContext punctiation
const contextGen = require('./contextGen');

module.exports = (calContext, expectedContext, array, cb) => {


  console.log('calcContext ', calContext);
  console.log('expected context ', expectedContext);


  var obj = {
    output: '',
    nextContext: ''
  };
 if(calContext === 'peopleCount') {
   obj.output = responseObj[responseObj[expectedContext].next].statement + array[0] + '. Just say \'abracadabra\' when you are ready to continue';
    obj.nextContext = responseObj[expectedContext].next;
 }
 else if(calContext === 'newOrder') {
    obj.output = responseObj[calContext].statement;
    obj.nextContext = 'newOrder';
  }

 else if(calContext === 'restart') {
    obj.output = responseObj[expectedContext].statement;
    obj.nextContext = expectedContext;
  } 
  
  else if (calContext === 'assertion') {
    obj.output = responseObj[responseObj[expectedContext].next].statement;
    obj.nextContext = responseObj[expectedContext].next;
  }

  else if(calContext === 'negation') {
    obj.output = responseObj[responseObj[expectedContext].prev].negation;
    obj.nextContext = expectedContext;
  } 
  
  else if (calContext === expectedContext) {
    obj.output = responseObj[responseObj[expectedContext].next].statement;
    obj.nextContext = responseObj[expectedContext].next;
  } 
  
  else if (calContext !== expectedContext) {
    obj.output = responseObj[expectedContext].query;
    obj.nextContext = expectedContext;
  }


  cb(obj);



  // //checking inside calContext.txt
  // if (calContext === currentContext || calContext === 'assertion') {
  //   var obj = {
  //     output: '',
  //     currentContext: currentContext,
  //     nextContext: responseObj[currentContext].next
  //   };

    
  //   if (punctuation === 'question') {
  //     obj.output = responseObj[calContext].question;
  //   } else {
  //     obj.output = responseObj[calContext].statement;
  //   }

  //   if (obj.nextContext === 'topping') {
  //     obj.toppings = [
  //       {
  //         name: 'pepperoni'
  //       },
  //       {
  //         name: 'cheese'
  //       }
  //     ];
  //     cb(obj);
  //   } else {
  //     cb(obj);
  //   }
  // } else if (calContext === null) {
  //   var obj = {
  //     output: responseObj[currentContext].query,
  //     currentContext: currentContext,
  //     nextContext: currentContext
  //   }; 
  //   cb(obj);
  // } else if (calContext !== currentContext && calContext !== 'negation') {
  //   var obj = {
  //     output: 'I\'m sorry. I didn\'t understand that. ' + responseObj[currentContext].query,
  //     currentContext: currentContext,
  //     nextContext: responseObj[currentContext].next
  //   };
  //   cb(obj);
  // } else {
  //   //negation code goes here
  // }
};


var responseObj = {
  greeting: {
    question: 'What kind of pizza would you like?',
    statement: 'What kind of pizza would you like?',
    query: 'Was this a greeting?',
    next: 'newOrder',
    prev: 'greeting',
    assertion: '',
    negation: ''
  },
  newOrder: {

    // question: 'Alright! Would you like to order a new pizza?',
    statement: 'Alright! Would you like to order a new pizza?',
    query: 'I\'m not sure I understand. Want to start a new order for pizza?',
    negation: 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin',
    next: 'hungerLevel',
    prev: 'newOrder'
  },

  hungerLevel: {
    statement: 'Why don\'t you tell me how hungry you are',
    query: 'Umm ... what was that? Very hungry, moderately hungry, or a little?',
    negation: 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin',
    next: 'peopleCount',
    prev: 'newOrder'
  },

  peopleCount: {
    statement: 'Okay. How many additional people will be eating with you?',
    query: 'I\'m just looking for a count ... 0 / 1 /2 etc.',
    negation: 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin',
    next: 'totalPizzas',
    prev: 'hungerLevel'

  },

  totalPizzas: {
    statement : 'I\'ve done some math, and I think you need ',
    negation: 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin',
    next: 'toppings',
    prev: 'peopleCount'

  },

  toppings: {
    statement: 'Alright! Ready to select some toppings? Click away, and I\'ll add these to your order',
    query: 'Pick from the toppings you see around you. You can use your VR headset',
    negation: 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin',
    next: 'sides',
    prev: 'totalPizzas'  
  },

  // pizzaType: {
  //   question: 'Of course! So what kind of toppings would you like?',
  //   statement: 'Sweet, now that we have the size, pick the toppings you like. Here are some options',
  //   query: 'I\'m not sure I understand. A few of the crusts that I have are: thin and deep dish. Let me know which one you would like.',
  //   next: 'topping'
  // },



  // topping: {
  //   question: 'Yes you can! What kind of pizza would you like?',
  //   statement: 'Nice! Sounds like we are making a delicious pizza here. What kind of sauce do you want?',
  //   query: 'I\'m not sure I have that topping available. Give me another toping you would like instead.',
  //   next: 'sauce'
  // }

};


module.exports = {
  greeting: ['hi', 'hello', 'what’s', 'up', 'been', 'you', 'what', 'sup', 'yo', 'good'],
  newOrder: ['new', 'order', 'pizza', 'want'],
  hungerLevel: ['very', 'little', 'lot', 'decent', 'medium', 'starving', 'ravenous', 'super', 'hella', 'eh'],
  totalPeople: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
  confirmCount: [],
  toppings: [],
  sides: [],
  drinks: [],
  finalOrder: [],
  assertion: ['yes', 'yeah', 'yah', 'ya', 'sure', 'absolutely', 'definitely'],
  negation: ['no', 'nah', 'na', 'nope', 'not'],
  restart: ['start'],
  quit: ['exit', 'cancel', 'stop', 'quit', 'terminate']
};


var dominosToppings = {};

module.exports.responseObj = responseObj;
