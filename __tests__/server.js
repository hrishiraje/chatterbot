var request = require('request');
var expect = require('chai').expect;

describe('server', function() {

  var server;

  before(function () {
    server = app.listen(9000, function() {
      console.log('Test app is listening on 9000');
    });
  });

  after(function() {
    server.close();
  });

  it('should respond to GET requests for "/" 200 status code', function(done) {
    request('http://127.0.0.1:9000/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  xit('should send an object back containing the response from the server', function(done) {
    request('http://127.0.0.1:9000/api/responseGet', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  xit('should send an object back containing the response from the server', function(done) {
    request('http://127.0.0.1:9000/api/responseGet', function (error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });
  
  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:9000/lmao', function (error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

});
