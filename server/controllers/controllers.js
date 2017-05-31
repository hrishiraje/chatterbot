// var clientSid = process.env.TWILIO_ACCOUNT_SID;
// var token = process.env.TWILIO_AUTH_TOKEN;
// var myPhone = process.env.TWILIO_PHONE_NUMBER;
var models = require('../models/models.js');
var url = require('url');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN);

module.exports = {

  robot: {
    responseGet: function(req, res) {
      var queryParameter = url.parse(req.url, true).query;
      console.log('query parameter received --->', queryParameter);
      if(queryParameter.message[queryParameter.message.length - 1] === '?') {
        queryParameter.message = queryParameter.message.slice(0, queryParameter.message.length - 1) + ' ' + queryParameter.message[queryParameter.message.length - 1];
        
      }
      var message = queryParameter.message.split(' ');
      var messageContext = queryParameter.context;
      
      console.log('message after split', message);
      console.log('message context', messageContext);
      
      models.robot.responseGet(message, messageContext, function(err, data) {
        if (err) {
          res
            .status(500)
            .send(err);
        } else {
          console.log('this is the data from the robot', data);
          res
            .status(200)
            .send(data);
        }
      });
    },
    startup: function(req, res) {
      var message = {
        text: 'Hi there, my name is Chatty! Type in any character to begin',
        nextContext: 'newOrder'  
      };
      res
        .status(200)
        .send(message);
    },
    placeOrder: function(req, res) {
      var order = req.body;
      console.log('This is the order', order);

      models.robot.placeOrder(order, function(err, data) {
        if (err) {
          res
            .status(404)
            .send(err);
        } else {
          res
            .status(200)
            .send({output: 'we ordered it fam'});
        }
      });
    },

    sms: function(req, res) {
      client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+1 206-604-4935',
      body: "Pizza Party test message!"
      }, function(err, message) {
  if(err) {
    console.error(err.message);
  } else console.log('Sent a text ... hopefully!');
});
    }
  }
};