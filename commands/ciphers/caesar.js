const Caesar = require('../../cipher-manipulations/CaesarManipulation')

module.exports = {
    commands: ['caesar'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using the caesar cipher.',
    minArgs: 3,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <numerical key> <message>',
    callback: async function ({ message, args, text, client, prefix, instance }) {
        const { guild } = message

        // Set the syntax error message
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR', {
                PREFIX: prefix,
                COMMAND: this.names[0],
                ARGUMENTS: this.expectedArgs
            })

        let intent = args.shift()
        let key = args.shift()
        let target = args.join(' ')

        if (isNaN(key)) { await message.reply(syntaxtError); await message.delete(); return }

        switch (intent) {
            case 'e':
            case 'encrypt':
                await message.reply(`I hope you didn't forget your key ;) \`\`\`${Caesar.parse(intent, key, target)}\`\`\``)
                await message.delete()
                break;
            case 'd':
            case 'decrypt':
                await message.reply(`||${Caesar.parse(intent, key, target)}||`)
                await message.delete()
                break;
            default:
                await message.reply(syntaxtError)
                await message.delete()
                break;
        }
    }
}