var mysql = require('mysql');
var request = require('request'); 
var expect = require('chai').expect;

describe('Persistent chatbot Database', function () {
  var dbConnection;

  beforeEach(function (done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chatbot'
    });
    dbConnection.connect();

    var tablename = ''; 

    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function () {
    dbConnection.end();
  });

});