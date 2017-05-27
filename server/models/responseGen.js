//object coming from Contextgen giving calContext in string and expected next calContext punctiation
const contextGen = require('./contextGen');

module.exports = (calContext, currentContext, punctuation, cb) => {

  console.log('received punctuation by responsegen ', punctuation);
  console.log('calcContext ', calContext);
  console.log('expected context ', currentContext);

  //checking inside calContext.txt
  if (calContext === currentContext || calContext === 'assertion') {
    var obj = {
      output: '',
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    };

    if (punctuation === 'question') {
      obj.output = responseObj[calContext].question;
    } else {
      obj.output = responseObj[calContext].statement;
    }

    if (obj.nextContext === 'topping') {
      obj.toppings = [
        {
          name: 'pepperoni'
        },
        {
          name: 'cheese'
        }
      ];
      cb(obj);
    } else {
      cb(obj);
    }
  } else if (calContext === null) {
    var obj = {
      output: responseObj[currentContext].query,
      currentContext: currentContext,
      nextContext: currentContext
    }; 
    cb(obj);
  } else if (calContext !== currentContext && calContext !== 'negation') {
    var obj = {
      output: 'I\'m sorry. I didn\'t understand that. ' + responseObj[currentContext].query,
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    };
    cb(obj);
  } else {
    //negation code goes here
  }
};

var responseObj = {
  greeting: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'What kind of pizza would you like?',
    query: 'Was this a greeting?',
    next: 'newOrder'
  },
  newOrder: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'Great! Let\'s figure out what kind of pizza. A good pizza begins with a great crust! Do you know what size of pizza you\'d like',
    query: 'I\'m not sure I understand. Want to start a new order for pizza?',
    next: 'pizzaType'
  },
  pizzaType: {
    question: 'Of course! So what kind of toppings would you like?',
    statement: 'Sweet, now that we have the size, pick the toppings you like. Here are some options',
    query: 'I\'m not sure I understand. A few of the crusts that I have are: thin and deep dish. Let me know which one you would like.',
    next: 'topping'
  },
  // topping: {
  //   question: 'Yes you can! What kind of pizza would you like?',
  //   statement: 'Nice! Sounds like we are making a delicious pizza here. What kind of sauce do you want?',
  //   query: 'I\'m not sure I have that topping available. Give me another toping you would like instead.',
  //   next: 'sauce'
  // }

};


var dominosToppings = {};