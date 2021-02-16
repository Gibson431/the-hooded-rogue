const { encrypt, decrypt } = require('vigenere-cipher')

module.exports = {
    commands: ['vigenere', 'v'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using the vigenere cipher.',
    minArgs: 3,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <one word key> <message>',
    callback: async function ({ message, args, text, client, prefix, instance }) {
        const { guild } = message

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR', {
                PREFIX: prefix,
                COMMAND: this.names[0],
                ARGUMENTS: this.expectedArgs
            })

        let intent = args.shift()
        let key = args.shift()
        let target = args.join(' ')

        switch (intent) {
            case 'e':
            case 'encrypt':
                await message.reply(`I hope you didn't forget your key ;) \`\`\`${encrypt(target, key)}\`\`\``)
                await message.delete()
                break;
            case 'd':
            case 'decrypt':
                await message.reply(`||${decrypt(target, key)}||`)
                await message.delete()
                break;
            default:
                await message.reply(syntaxtError)
                await message.delete()
                break;
        }
    }
}