'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();


  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;

    if (!input) return res.status(200).json("invalid unit");
    input = input.trim();
    const initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if ((initNum == "invalid number") && (initUnit == "invalid unit")) return res.status(200).json("invalid number and unit");
    if (initNum == "invalid number") return res.status(200).json("invalid number");
    if (initUnit == "invalid unit") return res.status(200).json("invalid unit");
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    // console.log(`"api tests:","initNum:"${initNum} "initUnit:"${initUnit}, "returnUnit:"${returnUnit}, "returnNum:"${returnNum}`);
    // return res.send("building")
    const initUnitString = convertHandler.spellOutUnit(initUnit);
    const returnUnitString = convertHandler.spellOutUnit(returnUnit);

    const responseStr = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString);

    const jsonRes = {"initNum":initNum,"initUnit":initUnit,"returnNum":returnNum,"returnUnit":returnUnit,"string":responseStr}

    res.status(200).json(jsonRes);
  })  

};
