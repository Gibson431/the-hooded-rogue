const Embed = require('@configurations/embed-construct')

module.exports = {
    commands: ['todo'],
    minArgs: 3,
    maxArgs: -1,
    expectedArgs: '<"new" || "edit"> <"complete" || "current" || "pain" || "lock"> [todo message] <-m messageID (only used when editing)> [-n note]',
    ownerOnly: true,
    callback: async function ({message, args, text, client, prefix, instance}) {
        const { guild } = message
        this.commands = ['todo']

        // expectedArgs = this.expectedArgs
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR')
            .replace('{PREFIX}', prefix)
            .replace('{COMMAND}', this.commands[0])
            .replace('{ARGUMENTS}', this.expectedArgs)

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
                await todoMessage.edit(await Embed.todo({ todoText, status, optionalArgs, todoMessage })).then(p=>{message.reply(`<#740527234799894529> updated.`)})
            } else {
                todoChannel.send(Embed.todo({ todoText, status, optionalArgs })).then(p=>{message.reply(`<#740527234799894529> updated.`)})
            }
        }


        else {
            todoText = args.join(' ')
            if (intent == 'new') {
                todoChannel.send(Embed.todo({ todoText, status })).then(p => { message.reply(`<#740527234799894529> updated.`) })
            } else {
                message.reply(syntaxtError)
            }
        }
    }
}