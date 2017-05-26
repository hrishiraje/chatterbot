var request = require('request');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var chai = require('chai');
var should = chai.should();
chai.use(chaiHttp);

describe('server', function() {

  it('should respond to GET requests for "/" 200 status code', (done) => {
    chai.request('http://127.0.0.1:9000')
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
    });

  it('should send an object back containing the response from the server', function(done) {
    request('http://127.0.0.1:9000/api/response', function(error, res, body) {
      expect(res.body).to.be.an('object');
      expect(res.body.results).to.be.an('array');
      done();
    });
  });

  it('should send an object back containing the response from the server', function(done) {
    request('http://127.0.0.1:9000/api/response', function (error, response, body) {
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
