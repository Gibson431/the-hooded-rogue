const btoa = require('btoa')
const atob = require('atob')

module.exports = {
    commands: ['base64', 'b64'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using the base64 system.',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" || "decrypt"> <message>',
    callback: function ({message, args, text, client, prefix, instance}) {
        const { guild } = message
        this.commands = ['base64']

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.commands[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        let intent = args.shift()
        let target = args.join(' ')

        switch (intent) {
            case 'e':
            case 'encrypt':
                message.reply(`\`${btoa(target)}\``)
                break;
            case 'd':
            case 'decrypt':
                message.reply(`\`${atob(target)}\``)
                break;
            default:
                message.reply(syntaxtError)
                break;
        }
    }
}