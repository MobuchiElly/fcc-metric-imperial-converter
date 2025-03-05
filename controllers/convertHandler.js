function ConvertHandler(input) {
  const regex = /^([\d*./]+)?([a-zA-Z]+)/;

  this.getNum = function(input) {
    let result = eval(input.match(regex)[1]) || 1;
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    try{
      result = input.match(regex)[2].toLowerCase();
    } catch(err){
      result = null;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitJson = {
      "gal":"l",
      "lbs":"kg",
      "mi":"km",
      "l":"gal",
      "kg":"lbs",
      "km":"mi"
    }
    let result = unitJson[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    const unitsInFull = {
      "gal":"gallons",
      "lbs":"pounds",
      "mi":"miles",
      "l":"liters",
      "kg":"kilograms",
      "km":"kilometers"
    };
    let result = unitsInFull[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit){
      case "gal":
        result = initNum * 3.78541;
        break;
      case "lbs": 
        result = initNum * 0.453592;
        break;
      case "mi": 
        result = initNum * 1.60934;
        break;
      case "l":
        result = initNum / 3.78541;
        break;
      case "kg":
        result = initNum / 0.453592;
        break;
      case "km":
        result = initNum / 1.60934;
        break;
    }
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };
  
}

module.exports = ConvertHandler;