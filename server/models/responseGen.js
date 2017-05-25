//object coming from Contextgen giving calContext in string and expected next calContext punctiation
var contextGen = require('./contextGen');
responseObj = {
  greeting: {
    question: "Yes you can! What kind of pizza would you like?",
    statement: "What kind of pizza would you like?",
    query: "Was this a greeting?",
    next: "initiate order"
  }
}

responseGen = (calContext, currentContext, punctuation) => {

  //checking inside calContext.txt
  if(calContext===currentContext || calContext === "Assertion"){
    var obj = {
      output: "",
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    }
    if(punctuation === "question"){
      obj.output = responseObj[calContext].question;
    }else {
      obj.output = responseObj[calContext].statement;
    }
    return obj;
  }else if (calContext === null) {
    var obj = {
      output: responseObj[currentContext].query,
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    } 
    return obj;
  } else if(calContext !== currentContext && calContext !== "Negation"){
    var obj = {
      output: "I'm sorry. I didn't understand that. " + responseObj[currentContext].statement,
      currentContext: currentContext,
      nextContext: responseObj[currentContext].next
    }
    return obj;
  } else {
    //negation code goes here
  }
}

return responseGen("greeting", "greeting", "statement");