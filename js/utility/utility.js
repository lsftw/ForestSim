// Dependencies: None

var Utility = {
    randomInt: function(min, max) {
        if (max < min) {
            var tmp = min;
            min = max;
            max = tmp;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    hexToDecimal: function (hex) {
        return parseInt(hex, 16);
    },
    decimalToHex: function (decimal) {
        return decimal.toString(16);
    },
    // Usage: randomColor('#59FF7D', '#486900')
    randomColor: function(color1, color2) {
        var redHex1 = Utility.hexToDecimal(color1.slice(1, 3));
        var greenHex1 = Utility.hexToDecimal(color1.slice(3, 5));
        var blueHex1 = Utility.hexToDecimal(color1.slice(5, 7));
        var redHex2 = Utility.hexToDecimal(color2.slice(1, 3));
        var greenHex2 = Utility.hexToDecimal(color2.slice(3, 5));
        var blueHex2 = Utility.hexToDecimal(color2.slice(5, 7));
        var red = Utility.decimalToHex(Utility.randomInt(redHex1, redHex2));
        var green = Utility.decimalToHex(Utility.randomInt(greenHex1, greenHex2));
        var blue = Utility.decimalToHex(Utility.randomInt(blueHex1, blueHex2));
        return '#' + red + green + blue;
    },
    // Usage: var hasEvenNumber = arrayHasAny('[1, 2, 3, 4]', number => number % 2)
    arrayHasAny: function(array, predicate) {
        for (var element of array) {
            if (predicate(element)) {
                return true;
            }
        }
        return false;
    }
};
