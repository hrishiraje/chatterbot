//object coming from Contextgen giving calContext in string and expected next calContext punctiation
const contextGen = require('./contextGen');
const responseObj = require('./response');

module.exports = (calContext, currentContext, punctuation, cb) => {

  //checking inside calContext.txt
  if (calContext === currentContext || calContext === 'Assertion') {
    var obj = {
      output: '',
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    };
    if (punctuation === 'question') {
      obj.output = responseObj[calContext].question;
    } else {
      obj.output = responseObj[calContext].statement;
    }
    cb(obj);
  } else if (calContext === null) {
    var obj = {
      output: responseObj[currentContext].query,
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    }; 
    cb(obj);
  } else if (calContext !== currentContext && calContext !== 'Negation') {
    var obj = {
      output: 'I\'m sorry. I didn\'t understand that. ' + responseObj[currentContext].statement,
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    };
    cb(obj);
  } else {
    //negation code goes here
  }
};

