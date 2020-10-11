
var Utility = {
    randomInt: function(min, max) {
        if (max < min) {
            var tmp = min;
            min = max;
            max = tmp;
        }
        return Math.floor(Math.random() * (max - min)) + min;
    },
    hexToDecimal: function (hex) {
        return parseInt(hex, 16);
    },
    decimalToHex: function (decimal) {
        return decimal.toString(16);
    },
    // Usage: randomColor('#59FF7D', '#486900')
    randomColor: function(color1, color2) {
        var red1 = Utility.hexToDecimal(color1.slice(1, 3));
        var green1 = Utility.hexToDecimal(color1.slice(3, 5));
        var blue1 = Utility.hexToDecimal(color1.slice(5, 7));
        var red2 = Utility.hexToDecimal(color2.slice(1, 3));
        var green2 = Utility.hexToDecimal(color2.slice(3, 5));
        var blue2 = Utility.hexToDecimal(color2.slice(5, 7));
        var red = Utility.decimalToHex(Utility.randomInt(red1, red2));
        var green = Utility.decimalToHex(Utility.randomInt(green1, green2));
        var blue = Utility.decimalToHex(Utility.randomInt(blue1, blue2));
        return '#' + red + green + blue;
    }
};
