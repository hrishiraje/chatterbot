var responseGen = require('./responseGen').responseGen;
var contextGen = require('./contextGen').contextGen;

module.exports = {
  robot: {
    responseGet: function(message, messageContext, cb) {

      contextGen(message, messageContext, function(calcContext, messageContext, punctuation) {

        responseGen(calcContext, messageContext, punctuation, function(results) {
          if (!results) {
            cb(null, null);
          } else {
            cb(null, results);
          }
        });
      });
    },
    placeOrder: function(order, cb) {
      // place API logic for dominoes order here
    } 
  }
};