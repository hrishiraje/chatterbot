var models = require('../models/models.js');
var url = require('url');

module.exports = {
  robot: {
    responseGet: function(req, res) {
      var queryParameter = url.parse(req.url, true).query;
      console.log('query parameter received --->', queryParameter);
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
    }
  }
};