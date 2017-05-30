var contextValues = require('./contextValues');

module.exports = (contextArr) => {
  var sum = 0;
  var calculation = 0;
  contextArr.forEach((contextname)=>{
    sum += contextValue[contextname];
  });
  calculation = Math.round(sum / contextArr.length);
  var returnContext;
  for (var key in contextValues) {
    if (contextValues[key] === calculation) {
      returnContext = key;
    }
  }
  return returnContext;
};
