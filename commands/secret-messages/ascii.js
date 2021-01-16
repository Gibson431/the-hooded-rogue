module.exports = {
    commands: ['ascii'],
    category: 'Ciphers',
    description: 'Converts a message to and from ASCII',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"encrypt" or "decrypt"> <message>',
    callback: function ({message, args, text, client, prefix, instance}) {
        const { guild } = message
        this.commands = ['ascii']

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.commands[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        let intent = args.shift()
        let target = args.join(' ')
        let result = []

        switch (intent) {
            case 'e':
            case 'encrypt':
                target = target.split('')
                result = target.map(c => c.charCodeAt())
                message.reply(`\`${result.join(' ')}\``)
                break;
            case 'd':
            case 'decrypt':
                result = args.map(x => {
                    if (!isNaN(x)) {
                        return String.fromCharCode(parseInt(x))
                    } else { return '{?}' }
                })
                message.reply(`\`${result.join('')}\``)
                break;
            default:
                message.reply(syntaxtError)
                break;
        }
    }
}
