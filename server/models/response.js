module.exports = {
  greeting: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'What kind of pizza would you like?',
    query: 'Was this a greeting?',
    next: 'neworder'
  },
  neworder: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'What kind of pizza would you like?',
    query: 'Was this a greeting?',
    next: 'pizzaType'
  },
  pizzaType: {
    question: 'Of course! So with that  ____ pizza what kind of toppings would you like?',
    statement: 'So you wanted ____ pizza? Alright, what kind of toppings would you like?',
    query: 'Was this a greeting?',
    next: 'topping'
  }
};