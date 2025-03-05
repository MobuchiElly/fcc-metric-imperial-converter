'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const regex = /^(?:\d+(?:\.\d+)?(?:\/\d+)?)?([a-zA-Z]+)$/;
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
    const input = req.query.input;
    let match = regex.test(input);
    if (!input) return res.status(200).json("invalid unit");

    let initUnit = convertHandler.getUnit(input);
    if((!match && !validUnits.includes (initUnit)) || !match && !initUnit) return res.status(200).json("invalid number and unit");
    if (!validUnits.includes(initUnit)) return res.status(200).json("invalid unit");
    if (!match) return res.status(200).json("invalid number");
    const initNum = convertHandler.getNum(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);

    const returnNum = convertHandler.convert(initNum, initUnit);
    const initUnitString = convertHandler.spellOutUnit(initUnit);
    const returnUnitString = convertHandler.spellOutUnit(returnUnit);
    if (initUnit=="l") initUnit = "L";
    if (returnUnit=="l") returnUnit = "L";

    const responseStr = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString);

    const jsonRes = {"initNum":initNum,"initUnit":initUnit,"returnNum":returnNum,"returnUnit":returnUnit,"string":responseStr}

    res.status(200).json(jsonRes);
  })  

};
