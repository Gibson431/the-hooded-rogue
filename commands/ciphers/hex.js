module.exports = {
    commands: ['hexadecimal', 'hex'],
    category: 'Ciphers',
    description: 'Converts text to hexadecimal and back',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <message>',
    callback: async function ({message, args, prefix, instance}) {
        const { guild } = message

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.names[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        let intent = args.shift()
        let target = args.join(' ')
        let result = []

        switch (intent) {
            case 'e':
            case 'encrypt':
                target = target.split('')
                result = target.map(char => char.charCodeAt().toString(16))
                await message.reply(`\`\`\`${result.join(' ')}\`\`\``)
                await message.delete()
                break;
            case 'd':
            case 'decrypt':
                result = args.map(char => {
                    if (!isNaN(char)) {
                        return String.fromCharCode(parseInt(char, 16))
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