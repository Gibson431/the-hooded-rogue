module.exports = {
    commands: ['roll', 'r'],
    category: 'Randomizers',
    description: 'A simple dice roll command',
    expectedArgs: '<number of rolls>d<sides on die>',
    minArgs: 1,
    maxArgs: 1,
    callback: function ({message, args, text, client, prefix, instance}) {
        const { guild } = message

        this.commands = ['roll']
        // command = this.commands[0]

        // expectedArgs = this.expectedArgs
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.commands[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

        commandArgs = args[0].split('d')
        if (commandArgs.length != 2) { message.reply(syntaxtError); return }
        numRoles = commandArgs[0]
        sides = commandArgs[1]

        if (!(isNaN(numRoles) || isNaN(sides))) {
            results = []
            total = 0
            numRoles = parseInt(numRoles)
            sides = parseInt(sides)
            for (i = 0; i < numRoles; i++) {
                role = Math.ceil(Math.random() * sides)
                results[i] = role
                total += role
            }
            message.reply(`total: ${total}, would you like to see all the roles individually?(y/n)`)
            let filter = (msg) => (msg.author.id == message.author.id)
            message.channel.awaitMessages(filter, { max: 1, time: 60000 })
                .then(collection => {
                    response = collection.first()
                    if (!response) { return }
                    response.content = response.content.toLowerCase()
                    if (response.content == 'yes' || response.content == 'y') { response.channel.send(results.join(', ')) }
                })
        } else { message.reply(syntaxtError) }
    }
}