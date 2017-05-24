var models = require('../models/models.js');
var url = require('url');

module.exports = {
  robot: {
    responseGet: function(req, res) {
      var queryParameter = url.parse(req.url, true).query;
      console.log('query parameter received --->', queryParameter);

      models.robot.responseGet(queryParemeter, function(err, data) {
        if (err) {
          res
            .status(500)
            .send(err);
        } else {
          res
            .status(200)
            .send(data);
        }
      });
    }
  }
};