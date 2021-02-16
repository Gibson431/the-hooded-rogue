module.exports = {
    commands: ['ascii'],
    category: 'Ciphers',
    description: 'Converts a message to and from ASCII',
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
        let result = []

        switch (intent) {
            case 'e':
            case 'encrypt':
                target = target.split('')
                result = target.map(c => c.charCodeAt())
                await message.reply(`\`\`\`${result.join(' ')}\`\`\``)
                await message.delete()
                break;
            case 'd':
            case 'decrypt':
                result = args.map(x => {
                    if (!isNaN(x)) {
                        return String.fromCharCode(parseInt(x))
                    } else { return '{?}' }
                })
                await message.reply(`||${result.join('')}||`)
                await message.delete()
                break;
            default:
                await message.reply(syntaxtError)
                await message.delete()
                break;
        }
    }
}
