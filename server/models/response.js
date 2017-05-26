module.exports = {
  greeting: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'What kind of pizza would you like?',
    query: 'Was this a greeting?',
    next: 'newOrder'
  },
  newOrder: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'Great! Let\'s figure out what kind of pizza. A good pizza begins with a great crust! Do you know what kind of crust you\'d like',
    query: 'I\'m not sure I understand. Want to start a new order for pizza?',
    next: 'pizzaType'
  },
  pizzaType: {
    question: 'Of course! So with that  ____ pizza what kind of toppings would you like?',
    statement: 'So you wanted ____ pizza? Alright, what kind of toppings would you like?',
    query: 'Was this a greeting?',
    next: 'topping'
  }
};