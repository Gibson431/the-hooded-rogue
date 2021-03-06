const Embed = require('@configurations/embed-construct')

module.exports = {
    commands: ['todo'],
    category: 'Dev Commands',
    description: 'Creates and edits the todo list.',
    minArgs: 3,
    maxArgs: -1,
    expectedArgs: '<"new" or "edit"> <"complete" or "current" or "pain" or "lock"> [message] <-m messageID (only used when editing)> ["-n" note]',
    ownerOnly: true,
    callback: async function ({ message, args, text, client, prefix, instance }) {
        const { guild } = message

        // expectedArgs = this.expectedArgs
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR', {
                PREFIX: prefix,
                COMMAND: this.names[0],
                ARGUMENTS: this.expectedArgs
            })

        let intent = args.shift()
        let status = args.shift()
        let optionalArgs = null

        if ((!['new', 'edit'].includes(intent) || !["complete", "current", "pain", "lock"].includes(status))) { message.reply(syntaxtError); return }

        let todoChannel = guild.channels.cache.find(c => c.name === 'to-do-list')

        if (text.includes('-')) {
            let options = text.split('-')
            optionalArgs = {}
            for (let i = 1; i < options.length; i++) {
                option = options[i].split(' ')
                optionalArgs[option.shift()] = option.join(' ')
            }

            let todoText = options[0].split(' ').slice(2).join(' ')

            if (!isNaN(optionalArgs.m)) {
                todoMessage = await todoChannel.messages.fetch(optionalArgs.m)
                await todoMessage.edit(await Embed.todo({ todoText, status, optionalArgs, todoMessage }))
                message.reply(`<#740527234799894529> updated.`)
            } else {
                await todoChannel.send(await Embed.todo({ todoText, status, optionalArgs }))
                message.reply(`<#740527234799894529> updated.`)
            }
        }


        else {
            todoText = args.join(' ')
            if (intent == 'new') {
                await todoChannel.send(Embed.todo({ todoText, status }))
                message.reply(`<#740527234799894529> updated.`)
            } else {
                message.reply(syntaxtError)
            }
        }
    }
}