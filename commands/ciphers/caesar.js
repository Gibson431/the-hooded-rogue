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
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.names[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        if ((args[0] === 'encrypt' || args[0] === 'decrypt') && (!isNaN(args[1]))) {
            let intent = args.shift()
            let key = args.shift()
            text = args.join(' ')
            await message.reply(intent === `encrypt` ? `I hope you didn't forget your key ;) \`\`${Caesar.parse(intent, key, text)}\`\` ` : `||${Caesar.parse(intent, key, text)}||`)
            await message.delete()
        } else { await message.reply(syntaxtError); await message.delete() }
    }
}