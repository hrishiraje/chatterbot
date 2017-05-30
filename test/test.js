const request = require('request');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const chai = require('chai');
const should = chai.should();
const punctuation = require('../server/models/contextGen').punctuation;
const contextGen = require('../server/models/contextGen').contextGen;
const responseGen = require('../server/models/responseGen').responseGen;
const responseObj = require('../server/models/responseGen').responseObj;

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

describe('punctuation', function() {
  it('should return question for ?', function() {
    var result = punctuation(['large', 'pizza', '?']);
    expect(result).to.equal('question');
  });

  it('should return question for a question word', function() {
    var result = punctuation(['why', 'pizza', '?']);
    expect(result).to.equal('question');
  });

  it('should return statement if no question terms included', function() {
    var result = punctuation(['large', 'pizza']);
    expect(result).to.equal('statement');
  });
});


describe('Calculate Context', function () {
  it('should return no contexts when none of the words match', function() {
    contextGen(['my', 'name'], 'toppings', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal(null);
    });
  });

  it('should return a single context when one word matches', function() {
    contextGen(['very', 'lol'], 'hungerLevel', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('hungerLevel');
    });
  });

  it('should return a single context when one word matches', function () {
    contextGen(['10', 'lol'], 'totalPeople', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('peopleCount');
    });
  });

  it('should return a single context when multiple word matches', function () {
    contextGen(['starving', 'yes'], 'hungerLevel', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('hungerLevel');
    });
  });

  // assertion
  it('should handle assertion correctly', function() {
    contextGen(['absolutely'], 'newOrder', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('assertion');
    });
  });

  // negation
  it('should handle negation correctly', function () {
    contextGen(['no'], 'newOrder', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('negation');
    });
  });

  // restart
  it('should handle restart correctly', function () {
    contextGen(['start'], 'newOrder', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('restart');
    });
  });

});

describe('Response Generator', function() {
  it('should return the correct query statement to the user if there is no context provided', function() {
    responseGen('toppings', 'hungerLevel', [], function(obj) {
      var expectedOutput = 'Umm ... what was that? Very hungry, moderately hungry, or a little?';
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should return the correct next context when the calculated context matches the message context', function() {
    responseGen('hungerLevel', 'hungerLevel', [], function (obj) {
      expect(obj.nextContext).to.equal('peopleCount');
    });
  });

  it('should return the correct statement if the calculated context matches the message context', function() {
    responseGen('totalPizzas', 'totalPizzas', [], function (obj) {
      var expectedOutput = responseObj[responseObj['totalPizzas'].next].statement;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  // null context gen
  it('should return a query question statement if the calculated context is null', function() {
    responseGen('', 'hungerLevel', [], function (obj) {
      var expectedOutput = 'Umm ... what was that? Very hungry, moderately hungry, or a little?';
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  // negation
  it('should return the correct statement for negation calc context ', function () {
    responseGen('negation', 'newOrder', [], function (obj) {
      var expectedOutput = 'Awww ... I\'ll be waiting here when you want to pick up your order. Just say \'start again\' to begin';
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should return the correct statement for restart calc context ', function () {
    responseGen('restart', 'hungerLevel', 'statement', function (obj) {
      var expectedOutput = 'Why don\'t you tell me how hungry you are';
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should handle concatenating the number of pizzas correctly', function(){
    responseGen('peopleCount', 'peopleCount',['2 large and 1 medium pizzas'], function(obj){
      var expectedOutput = 'I\'ve done some math, and I think you need 2 large and 1 medium pizzas. Just say \'abracadabra\' when you are ready to continue';
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should return the right response for an assertion', function(){
    responseGen('assertion', 'newOrder', [], function(obj){
      expect(obj.output).to.equal('Why don\'t you tell me how hungry you are');
    });
  });

});

