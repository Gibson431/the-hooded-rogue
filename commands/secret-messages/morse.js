const Morse = require('../../ciphers/MorseManipulation')

module.exports = {
    commands: ['morsecode', 'morse'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using morse code.',

    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <message>',
    callback: function ({message, args, text, client, prefix, instance}) {
        const { guild } = message
        this.commands = ['morse']

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.commands[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        if (args[0] === 'encrypt' || args[0] === 'decrypt') {
            let intent = args.shift()
            text = args.join(' ')
            message.reply(Morse.parse(intent, text))
        } else { message.reply(syntaxtError) }
    }
}