const Morse = require('../../cipher-manipulations/MorseManipulation')

module.exports = {
    commands: ['morse', 'morsecode'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using morse code.',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <message>',
    callback: async function ({ message, args, text, prefix, instance }) {
        const { guild } = message

        // Set the syntax error message
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.names[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        let intent = args.shift()
        let target = args.join(' ')

        switch (intent) {
            case 'e':
            case 'encrypt':
                await message.reply(`Here's your message: \`\`\`${Morse.parse(intent, target)}\`\`\``)
                await message.delete()
                break;
            case 'd':
            case 'decrypt':
                await message.reply(`||${Morse.parse(intent, target)}||`)
                await message.delete()
                break;
            default:
                await message.reply(syntaxtError)
                await message.delete()
                break;
        }
    }
}