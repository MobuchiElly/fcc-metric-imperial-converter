const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("convertHandler should correctly read a whole number input", function(){
        assert.equal(convertHandler.getNum("12kg"), 12)
    });
    
    test("convertHandler should correctly read a decimal number input", function(){
        assert.equal(convertHandler.getNum("12.4l"), 12.4)
    })

    test("convertHandler should correctly read a fractional input", function(){
        assert.equal(convertHandler.getNum("1/4l"), 0.25)
    })
    test("convertHandler should correctly read a fractional input with a decimal", function(){
        assert.equal(convertHandler.getNum("3.4/2lbs"), 1.7)
    })
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function(){
        assert.equal(convertHandler.getNum("3/2/3"), "invalid number")
    })
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function(){
       assert.equal(convertHandler.getNum("kg"), 1) 
    })
    test("convertHandler should correctly read each valid input unit", function(){
        assert.equal(convertHandler.getUnit("2lbs"), "lbs")
    })
    test("convertHandler should correctly return an error for an invalid input unit", function(){
        assert.equal(convertHandler.getUnit("2kh"), "invalid unit")
    })
    test("convertHandler should return the correct return unit for each valid input unit", function(){
        assert.equal(convertHandler.getReturnUnit("l"), "gal")
    })
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function(){
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons")
    })
    test("convertHandler should correctly convert gal to L", function(){
        assert.equal(convertHandler.getReturnUnit("gal"), "L")
    })
    test("convertHandler should correctly convert L to gal", function(){
        assert.equal(convertHandler.getReturnUnit("L"), "gal")        
    })
    test("convertHandler should correctly convert mi to km", function(){
        assert.equal(convertHandler.getReturnUnit("mi"), "km")
    })
    test("convertHandler should correctly convert km to mi", function(){
        assert.equal(convertHandler.getReturnUnit("km"), "mi")
    })
    test("convertHandler should correctly convert lbs to kg", function(){
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg")
    })
    test("convertHandler should correctly convert kg to lbs", function(){
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs")
    })
});