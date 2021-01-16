const Morse = require('../../ciphers/MorseManipulation')

module.exports = {
    commands: ['morse', 'morsecode'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using morse code.',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <message>',
    callback: function ({message, args, text, prefix, instance}) {
        const { guild } = message

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.names[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        if (args[0] === 'encrypt' || args[0] === 'decrypt') {
            let intent = args.shift()
            text = args.join(' ')
            message.reply(Morse.parse(intent, text))
        } else { message.reply(syntaxtError) }
    }
}