var request = require('request');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var chai = require('chai');
var should = chai.should();
var punctuation = require('../server/models/contextGen').punctuation;

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

  it('should send an object back containing the response from the server after calling a GET request to "/api/startup"', function(done) {
    chai.request('http://127.0.0.1:9000')
      .get('/api/startup')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.should.be.json;
        res.body.should.have.property('text');
        res.body.should.have.property('nextContext');
        res.body.text.should.be.a('string');
        res.body.nextContext.should.be.a('string');
        done();
      });
  });
   it('should respond to GET requests for "/api/response" + url client response with 200 status code and receieve an object with the robots responses', function(done) {
    chai.request('http://127.0.0.1:9000')
      .get('/api/response?message=yes&context=newOrder')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.should.be.json;
        res.body.should.have.property('output');
        res.body.should.have.property('nextContext');
        res.body.output.should.be.a('string');
        res.body.nextContext.should.be.a('string');
        done();
      });
  });
  
  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    chai.request('http://127.0.0.1:9000')
    .get('/lmao')
    .end((err, res) => {
      res.should.have.status(404);
      done();
    }); 
  });

});

describe('punctuation', function(){
  it('should return question for ?', function(){
    var result = punctuation(['large', 'pizza', '?']);
    expect(result).to.equal('question');
  });

  it('should return question for a question word', function(){
    var result = punctuation(['why', 'pizza', '?']);
    expect(result).to.equal('question');
  });

  it('should return statement if no question terms included', function(){
    var result = punctuation(['large', 'pizza']);
    expect(result).to.equal('statement');
  });
});

