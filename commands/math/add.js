module.exports = {
    commands: ['add'],
    category: 'Math',
    description: `A simple command for adding two numbers`,
    permissionError: 'You need admin permissions',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<num1> <num2> etc.',
    callback: function ({message, args, text, client, prefix, instance}) {
        const { guild } = message
        this.commands = ['ascii']

        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.commands[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        let total = 0
        let err = false
        args.map(arg => {
            if (!isNaN(arg)) { total += parseInt(arg); return parseInt(arg)}
            else { err = true; return arg }
        })
        if (!err) { message.reply(`\`${total}\``) }
        else { message.reply(syntaxtError) }
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: []
}