const btoa = require('btoa')
const atob = require('atob')

module.exports = {
    commands: ['base64', 'b64'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using the base64 system.',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <message>',
    callback: async function ({message, args, text, client, prefix, instance}) {
        const { guild } = message

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR', {
                PREFIX: prefix,
                COMMAND: this.names[0],
                ARGUMENTS: this.expectedArgs
            })

        let intent = args.shift()
        let target = args.join(' ')

        switch (intent) {
            case 'e':
            case 'encrypt':
                await message.reply(`\`\`\`${btoa(target)}\`\`\``)
                await message.delete()
                break;
            case 'd':
            case 'decrypt':
                await message.reply(`||${atob(target)}||`)
                await message.delete()
                break;
            default:
                await message.reply(syntaxtError)
                await message.delete()
                break;
        }
    }
}