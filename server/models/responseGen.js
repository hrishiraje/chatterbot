//object coming from Contextgen giving calContext in string and expected next calContext punctiation
const contextGen = require('./contextGen');

module.exports.responseGen = (calContext, expectedContext, array, cb) => {

  // console.log('received punctuation by responsegen ', punctuation);
  console.log('calcContext ', calContext);
  console.log('expected context ', expectedContext);

  var obj = {
    output: '',
    nextContext: ''
  };
  if (calContext === 'totalPizzas') {
    obj.output = responseObj[responseObj[expectedContext].next].statement;
    obj.nextContext = responseObj[expectedContext].next;
    obj.pizzaCode = '12SCREEN';
    obj.toppings = [
      {
        name: 'Pepperoni',
        image: 'http://goldenagecheese.com/blog/wp-content/uploads/2015/05/Turkey-Pepperoni1.jpg',
        code: 'P'
      },
      {
        name: 'Cheddar Cheese',
        image: 'http://www.holypine.com/wp-content/uploads/2015/10/Cheddar-Cheese-600x600.jpg',
        code: 'E'
      },
      {
        name: 'Black Olives',
        image: 'https://i.stack.imgur.com/n32HW.jpg',
        code: 'R'
      },
      {
        name: 'Green Peppers',
        image: 'https://www.ussupplyhouse.com/wp-content/uploads/2017/03/organic-green-pepper.jpg',
        code: 'G'
      },
      {
        name: 'Onions',
        image: 'https://ichef-1.bbci.co.uk/news/660/media/images/80896000/jpg/_80896768_red-onion-think624.jpg',
        code: 'O'
      },
      {
        name: 'Italian Sausage',
        image: 'https://d39hcmrh8xztgk.cloudfront.net/product_product-large_phpPTgCX3.jpg',
        code: 'S'
      }];
  } else if (calContext === 'peopleCount') {
    obj.output = responseObj[responseObj[expectedContext].next].statement + array[0] + '. Just say \'abracadabra\' when you are ready to continue';
    obj.nextContext = responseObj[expectedContext].next;
  } else if (calContext === 'newOrder') {
    obj.output = responseObj[calContext].statement;
    obj.nextContext = 'newOrder';
  } else if (calContext === 'restart') {
    obj.output = responseObj[expectedContext].statement;
    obj.nextContext = expectedContext;
  } else if (calContext === 'assertion') {
    obj.output = responseObj[responseObj[expectedContext].next].statement;
    obj.nextContext = responseObj[expectedContext].next;
  } else if (calContext === 'negation') {
    obj.output = responseObj[responseObj[expectedContext].prev].negation;
    obj.nextContext = expectedContext;
  } else if (calContext === expectedContext) {
    obj.output = responseObj[responseObj[expectedContext].next].statement;
    obj.nextContext = responseObj[expectedContext].next;
  } else if (calContext !== expectedContext) {
    obj.output = responseObj[expectedContext].query;
    obj.nextContext = expectedContext;
  }


  cb(obj);
};

var responseObj = {
  greeting: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'What kind of pizza would you like?',
    query: 'Was this a greeting?',
    next: 'newOrder'
  },
  newOrder: {
    // question: 'Alright! Would you like to order a new pizza?',
    statement: 'Let\'s begin! Would you like to order a new pizza?',
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
    statement: 'I\'ve done some math, and I think you need ',
    negation: 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin',
    next: 'toppings',
    prev: 'peopleCount'

  },

  toppings: {
    statement: 'Alright! Ready to select some toppings? Click away, and I\'ll add these to your order',
    query: 'Pick from the toppings you see around you. You can use your VR headset',
    negation: 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin',
    next: 'finalizeOrder',
    prev: 'totalPizzas'
  },

};