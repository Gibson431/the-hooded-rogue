const Morse = require('../../cipher-manipulations/MorseManipulation')

module.exports = {
    commands: ['morse', 'morsecode'],
    category: 'Ciphers',
    description: 'Encrypts or decrypts a message using morse code.',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <message>',
    callback: async function ({message, args, text, prefix, instance}) {
        const { guild } = message

        // Set the syntax error message
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.names[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        if (args[0] === 'encrypt' || args[0] === 'decrypt') {
            let intent = args.shift()
            text = args.join(' ')
            await message.reply(intent === `encrypt` ? ` \`\`${Morse.parse(intent, text)}\`\` ` : `||${Morse.parse(intent, text)}||`)
            await message.delete()
        } else { await message.reply(syntaxtError); await message.delete() }
    }
}