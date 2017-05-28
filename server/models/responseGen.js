//object coming from Contextgen giving calContext in string and expected next calContext punctiation
const contextGen = require('./contextGen');

module.exports.responseGen = function(calContext, currentContext, punctuation, cb) {

  console.log('received punctuation by responsegen ', punctuation);
  console.log('calcContext ', calContext);
  console.log('expected context ', currentContext);




  // if(calContext === 'negation') {
  //   var obj = {
  //     output: 'I\'m sorry you don\'t want to continue your order right now. I\'ll be waiting here if you want to restart your order. Just say \'start again\' and we can pick up where we left off', 
  //     currentContext: currentContext,
  //     nextContext: currentContext
  //   }
  //   cb(obj); 
    
  // }

//   if (calContext === 'restart') {
//     var obj = {
//       output: 'Woohoo! Let\'s pick up where we left off.' + responseObj[currentContext].statement,
//       currentContext: currentContext,
//       nextContext: responseObj[currentContext].next
//     };
//     cb(obj);
//   } else 

//   //checking inside calContext.txt
//   if (calContext === currentContext || calContext === 'assertion') {
//     var obj = {
//       output: '',
//       currentContext: currentContext,
//       nextContext: responseObj[currentContext].next
//     };

//     if (punctuation === 'question') {
//       obj.output = responseObj[calContext].question;
//     } else {
//       obj.output = responseObj[calContext].statement;
//     }

//     if (obj.nextContext === 'topping') {
//       obj.toppings = [
//         {
//           name: 'pepperoni'
//         },
//         {
//           name: 'cheese'
//         }
//       ];
//       cb(obj);
//     } else {
//       cb(obj);
//     }
//   } else if (calContext === null) {
//     var obj = {
//       output: responseObj[currentContext].query,
//       currentContext: currentContext,
//       nextContext: currentContext
//     }; 
//     cb(obj);
//   } else if (calContext !== currentContext && calContext !== 'negation') {
//     var obj = {
//       output: 'I\'m sorry. I didn\'t understand that. ' + responseObj[currentContext].query,
//       currentContext: currentContext,
//       nextContext: responseObj[currentContext].prev
//     };
//     cb(obj);
//   } else if (calContext === 'negation') {
//     var obj = {
//       output: 'I\'m sorry you don\'t want to continue your order right now. I\'ll be waiting here if you want to restart your order. Just say \'start again\' and we can pick up where we left off', 
//       currentContext: currentContext,
//       nextContext: responseObj[currentContext].prev
//     };
//     cb(obj); 
//   } /*else if (calContext === 'restart') {
//     var obj = {
//       output: 'Woohoo! Let\'s pick up where we left off.' + responseObj[currentContext].statement,
//       currentContext: currentContext,
//       nextContext: currentContext
//     }
//     cb(obj);
//   }*/
// };

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
    question: 'Yes you can! How hungry are you?',
    statement: 'Great! Let\'s get started. How hungry are you?',
    query: 'I\'m not sure I understand. Do you want to order a new pizza, yes or no',
    next: 'hungerLevel',
    prev: 'greeting',
    assertion: 'Great! Let\'s get started. How hungry are you?',
    negation: 'Ok, let me know when you want to continue. You can just type \'start again\' to continue'
  },
  hungerLevel: {
    question: 'And how many people other than you are going to be eating?',
    statement: 'And how many people other than you are going to be eating?',
    query: 'I\'m not sure I understand. How would you describe your hunger level?',
    next: 'totalPeople',
    prev: 'newOrder',
    assertion: 'And how many people other than you are going to be eating?',
    negation: 'Ok, let me know when you want to continue. You can just type \'start again\' to continue'
  },
  totalPeople: { // custom assertion logic, dont just go on to next context, keep context the same for this one
    question: 'Ok', // programmatically add number of pizzas that you will order
    statement: 'Ok', // programmatically add number of pizzas that you will order,
    query: 'Can\'t tell if that was English. Just type in the number of people besides you.',
    next: 'confirmCount',
    prev: 'hungerLevel',
    assertion: 'Thats not really what I\'m asking for. Can you tell me the number of people.',
    negation: 'Thats not really what I\'m asking for. Can you tell me the number of people.'
  },
  confirmCount: { 
    question: '',
    statement: '',
    query: '',
    next: '',
    prev: '',
    assertion: '',
    negation: ''
  },
  // pizzaType: {
  //   question: 'Of course! So what kind of toppings would you like?',
  //   statement: 'Let\'s pick some toppings! Why don\'t you put on your VR headset!',
  //   query: 'I\'m not sure I understand. A few of the crusts that I have are: thin and deep dish. Let me know which one you would like.',
  //   next: 'topping',
  //   prev: 'newOrder'
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
