const Embed = require("@configurations/embed-construct")

var encCodes = new Array(37);
encCodes["a"] = ".-";
encCodes["b"] = "-...";
encCodes["c"] = "-.-.";
encCodes["d"] = "-..";
encCodes["e"] = ".";
encCodes["f"] = "..-.";
encCodes["g"] = "--.";
encCodes["h"] = "....";
encCodes["i"] = "..";
encCodes["j"] = ".---";
encCodes["k"] = "-.-";
encCodes["l"] = ".-..";
encCodes["m"] = "--";
encCodes["n"] = "-.";
encCodes["o"] = "---";
encCodes["p"] = ".--.";
encCodes["q"] = "--.-";
encCodes["r"] = ".-.";
encCodes["s"] = "...";
encCodes["t"] = "-";
encCodes["u"] = "..-";
encCodes["v"] = "...-";
encCodes["w"] = ".--";
encCodes["x"] = "-..-";
encCodes["y"] = "-.--";
encCodes["z"] = "--..";
encCodes["1"] = ".----";
encCodes["2"] = "..---";
encCodes["3"] = "...--";
encCodes["4"] = "....-";
encCodes["5"] = ".....";
encCodes["6"] = "-....";
encCodes["7"] = "--...";
encCodes["8"] = "---..";
encCodes["9"] = "----.";
encCodes["0"] = "-----";
encCodes[" "] = "/";

var decCodes = new Array(37);
decCodes[".-"] = "a";
decCodes["-..."] = "b";
decCodes["-.-."] = "c";
decCodes["-.."] = "d";
decCodes["."] = "e";
decCodes["..-."] = "f";
decCodes["--."] = "g";
decCodes["...."] = "h";
decCodes[".."] = "i";
decCodes[".---"] = "j";
decCodes["-.-"] = "k";
decCodes[".-.."] = "l";
decCodes["--"] = "m";
decCodes["-."] = "n";
decCodes["---"] = "o";
decCodes[".--."] = "p";
decCodes["--.-"] = "q";
decCodes[".-."] = "r";
decCodes["..."] = "s";
decCodes["-"] = "t";
decCodes["..-"] = "u";
decCodes["...-"] = "v";
decCodes[".--"] = "w";
decCodes["-..-"] = "x";
decCodes["-.--"] = "y";
decCodes["--.."] = "z";
decCodes[".----"] = "1";
decCodes["..---"] = "2";
decCodes["...--"] = "3";
decCodes["....-"] = "4";
decCodes["....."] = "5";
decCodes["-...."] = "6";
decCodes["--..."] = "7";
decCodes["---.."] = "8";
decCodes["----."] = "9";
decCodes["-----"] = "0";
decCodes["/"] = " ";

function encrypt(target) {
    newMessage = target.split("")
    newString = ''
    for (index in target) {
        newMessage[index] = String(encCodes[target[index]] + ' ')
    }
    for (index in newMessage) {
        newString = newString.concat(newMessage[index])
    }
    return (newString)
}

function decrypt(target) {
    newMessage = target.split(' ')
    newString = ''
    for (index in newMessage) {
        newMessage[index] = String(decCodes[newMessage[index]] + '')
    }
    for (index in newMessage) {
        if (newMessage[index] !== 'undefined') { newString = newString.concat(newMessage[index]) }
        else { newString = newString.concat('{?}') }
    }
    return (newString)
}

exports.parse = (intent, text) => {
    switch (intent) {
        case 'e':
        case 'encrypt':
            return encrypt(text)
        case 'd':
        case 'decrypt':
            return decrypt(text)
    }
}