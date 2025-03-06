function ConvertHandler(input) {
  const regex = /^([\d*/.]+)?([a-zA-Z]+)?/;
  const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];


  this.getNum = function(input) {
    // console.log("test all cases:", input.match(regex));
    
    let numPart = input.match(regex)[1] ? input.match(regex)[1] : "1";
    let result;
    if (numPart.includes("/")){
      let parts = numPart.split("/");
      if((parts.length !== 2) || isNaN(parts[0]) || isNaN(parts[1])) return "invalid number";
      let numerator = parseFloat(parts[0]);
      let denominator = parseFloat(parts[1]);
      result = isNaN(numerator) || isNaN(denominator) || (denominator == 0) ? "invalid number" : numerator / denominator;
    } else {
      result = parseFloat(numPart)
    }
    return isNaN(result) ? "invalid number" : result;
  };

  this.getUnit = function(input) {
    let result = input.match(regex)[2] ? input.match(regex)[2].toLowerCase() : "invalid unit";
    if (!validUnits.includes(result)) return "invalid unit"
    if (result == "l") result = "L";
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
    let result = unitJson[initUnit.toLowerCase()];
    if (result == "l") result = "L"
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
    let result = unitsInFull[unit.toLowerCase()];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const LTogal = 1 / 3.78541;
    const kgTolbs = 1 / 0.453592;
    const kmTomi = 1 / 1.60934;

    let result;
    
    switch (initUnit.toLowerCase()){
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
    };
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };
  
}

module.exports = ConvertHandler;