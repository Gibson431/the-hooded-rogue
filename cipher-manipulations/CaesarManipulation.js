const Embed = require("@configurations/embed-construct")

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const commandFormat = '\`~caesar encrypt|decrypt <numerical key> "<message>"\`'

function encrypt(shift, target) {
    if (!isNaN(shift)) {
        newMessage = target.split('')
        newString = ''
        for (i in target) {
            if (alphabet.includes(target[i])) {
                newMessage[i] = alphabet[(26 + alphabet.indexOf(target[i]) + shift % 26) % 26]
            }
        }
        for (i in newMessage) {
            newString = newString + newMessage[i]
        }
        return (newString)
    } else { return Embed.cipherError(`The caesar cipher uses numerical keys, please use the format: \n${commandFormat}`) }
}

function decrypt(shift, target) {
    if (!isNaN(shift)) {
        newMessage = target.split('')
        newString = ''
        for (i in target) {
            if (alphabet.includes(target[i])) {
                newMessage[i] = alphabet[(26 + alphabet.indexOf(target[i]) - shift % 26) % 26]
            }
        }
        for (i in newMessage) {
            newString = newString + newMessage[i]
        }
        return (newString)
    } else { return Embed.cipherError(`The caesar cipher uses numerical keys, please use the format: \n${commandFormat}`) }
}

exports.parse = (intent, key, text) => {
    switch (intent) {
        case 'e':
        case 'encrypt':
            return encrypt(key, text)
        case 'd':
        case 'decrypt':
            return decrypt(key, text)
    }
}