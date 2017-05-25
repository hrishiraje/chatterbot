module.exports = (contextArr) => {
  var sum = 0;
  var calculation = 0;
  contextArr.forEach((contextname)=>{
    sum += contextValue[contextname];
  });
  calculation = Math.round(sum/contextArr.length);
  return calculation;
}