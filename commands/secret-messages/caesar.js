const Caesar = require('../../ciphers/CaesarManipulation')

module.exports = {
    commands: ['caesar'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using the caesar cipher.',
    minArgs: 3,
    maxArgs: -1,
    expectedArgs: '<"encrypt" || "decrypt"> <numerical key> <message>',
    callback: function ({message, args, text, client, prefix, instance}) {
        const { guild } = message
        this.commands = ['caesar']

        // Set the syntax error message
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.commands[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        if ((args[0] === 'encrypt' || args[0] === 'decrypt') && (!isNaN(args[1]))) {
            let intent = args.shift()
            let key = args.shift()
            text = args.join(' ')
            message.reply(Caesar.parse(intent, key, text))
        } else { message.reply(syntaxtError) }
    }
}