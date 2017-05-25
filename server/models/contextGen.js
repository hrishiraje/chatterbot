const contextData = require('./context.js');
// message is an array of words given to us by the user
// context is the message context

module.exports = function(message, context, cb) {
  cb('initial order', 'greeting', 'question'); 
};


