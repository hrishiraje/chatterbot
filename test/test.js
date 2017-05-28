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
      expect(calculatedContext).to.equal('totalPeople');
    });
  });

  it('should return a single context when one word matches', function () {
    contextGen(['exit', 'lol'], 'quit', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('quit');
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
  it('should return an im sorry phrase to the user if there is no context provided', function() {
    responseGen('newOrder', 'pizzaType', 'statement', function(obj) {
      var expectedOutput = 'I\'m sorry. I didn\'t understand that. ' + responseObj.pizzaType.query;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should return the next context when the calculated context matches the message context', function() {
    responseGen('newOrder', 'newOrder', 'statement', function (obj) {
      var expectedOutput = responseObj.newOrder.next;
      expect(obj.nextContext).to.equal(expectedOutput);
    });
  });

  it('should return the correct statement if the calculated context matches the message context', function() {
    responseGen('newOrder', 'newOrder', 'statement', function (obj) {
      var expectedOutput = responseObj['newOrder'].statement;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  // null context gen
  it('should return a query question statement if the calculated context is null', function() {
    responseGen('', 'newOrder', 'statement', function (obj) {
      var expectedOutput = 'I\'m sorry. I didn\'t understand that. ' + responseObj.newOrder.query;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  //punct question
  it('should return a question output if the punct is a question', function () {
    responseGen('newOrder', 'newOrder', 'question', function (obj) {
      var expectedOutput = responseObj.newOrder.question;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  //punct statement
  it('should return a query question statement if the calculated context is null', function () {
    responseGen('newOrder', 'newOrder', 'statement', function (obj) {
      var expectedOutput = responseObj.newOrder.statement;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  // negation
  it('should return the correct statement for negation calc context ', function () {
    responseGen('negation', 'newOrder', 'statement', function (obj) {
      var expectedOutput = 'I\'m sorry you don\'t want to continue your order right now. I\'ll be waiting here if you want to restart your order. Just say \'start again\' and we can pick up where we left off';
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should return the correct statement for restart calc context ', function () {
    responseGen('restart', 'pizzaType', 'statement', function (obj) {
      var expectedOutput = 'Woohoo! Let\'s pick up where we left off.' + responseObj.pizzaType.statement;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

});

