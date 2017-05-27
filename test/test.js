var request = require('request');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var chai = require('chai');
var should = chai.should();
var punctuation = require('../server/models/contextGen').punctuation;
var contextGen = require('../server/models/contextGen').contextGen;
var responseGen = require('../server/models/responseGen');

var responseObj = {
  greeting: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'What kind of pizza would you like?',
    query: 'Was this a greeting?',
    next: 'newOrder'
  },
  newOrder: {
    question: 'Yes you can! What kind of pizza would you like?',
    statement: 'Great! Let\'s figure out what kind of pizza. A good pizza begins with a great crust! Do you know what size of pizza you\'d like',
    query: 'I\'m not sure I understand. Want to start a new order for pizza?',
    next: 'pizzaType'
  },
  pizzaType: {
    question: 'Of course! So what kind of toppings would you like?',
    statement: 'Sweet, now that we have the size, pick the toppings you like. Here are some options',
    query: 'I\'m not sure I understand. A few of the crusts that I have are: thin and deep dish. Let me know which one you would like.',
    next: 'topping'
  },
  // topping: {
  //   question: 'Yes you can! What kind of pizza would you like?',
  //   statement: 'Nice! Sounds like we are making a delicious pizza here. What kind of sauce do you want?',
  //   query: 'I\'m not sure I have that topping available. Give me another toping you would like instead.',
  //   next: 'sauce'
  // }

};

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


describe('calculate context', function () {
  it('should return no contexts when none of the words match', function() {
    contextGen(['my', 'name'], 'toppings', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal(null);
    });
  });

  it('should return a single context when one word matches', function() {
    contextGen(['order', 'name'], 'toppings', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('newOrder');
    });
  });

  it('should return the correct expected context when there are multiple potential contexts', function() {
    contextGen(['order', 'pepperoni'], 'newOrder', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('newOrder');
    });
  });

  it('should handle assertion correctly', function() {
    contextGen(['absolutely'], 'newOrder', function (calculatedContext, context, punctuation) {
      expect(calculatedContext).to.equal('newOrder');
    });
  });
});

describe('response generator', function() {
  it('should return an im sorry phrase to the user if there is no context provided', function() {
    responseGen('not greeting', 'greeting', 'statement', function(obj) {
      var expectedOutput = 'I\'m sorry. I didn\'t understand that. ' + responseObj.greeting.query;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should return the next context when the calculated context matches the message context', function() {
    responseGen('greeting', 'greeting', 'statement', function (obj) {
      var expectedOutput = responseObj.greeting.next;
      expect(obj.nextContext).to.equal(expectedOutput);
    });
  });

  it('should return the correct statement if the calculated context matches the message context', function() {
    responseGen('greeting', 'greeting', 'statement', function (obj) {
      var expectedOutput = responseObj['greeting'].statement;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  it('should return a query question statement if the calculated context is null', function() {
    responseGen('', 'greeting', 'statement', function (obj) {
      var expectedOutput = 'I\'m sorry. I didn\'t understand that. ' + responseObj.greeting.query;
      expect(obj.output).to.equal(expectedOutput);
    });
  });

  //assertion

  //punct statement

  //punct question

});

