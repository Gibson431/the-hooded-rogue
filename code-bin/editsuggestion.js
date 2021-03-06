const Embed = require('@configurations/embed-construct')

module.exports = {
    commands: ['editsuggestion', 'suggestion'],
    category: 'Dev Commands',
    description: 'Edits a suggestion and sets the status and color.',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<"accept" or "deny"> <messageID> [reason]',
    ownerOnly: true,
    callback: async function ({message, args, text, client, prefix, instance}) {
        const { guild } = message

        // expectedArgs = this.expectedArgs
        syntaxtError = instance.messageHandler
            .get(guild, 'SYNTAX_ERROR', {
                PREFIX: prefix,
                COMMAND: this.names[0],
                ARGUMENTS: this.expectedArgs
            })

        // Initialise the variables
        let status = args.shift()
        let messageID = args.shift()
        let reason = args.join(' ')
        let suggestionMessage = null
        let updated = false

        // Check syntax
        if (!['a', 'accept', 'accepted', 'd', 'deny', 'denied', 'undecided'].includes(status) || isNaN(messageID)) { message.reply(syntaxtError) }

        // Find embed and edit
        await guild.channels.cache.each(async (channel) => {
            if (channel.type == 'text') {
                let result = await channel.messages.fetch(messageID).catch(err => { })
                if (result) {
                    suggestionMessage = result
                    suggestionMessage.edit(await Embed.suggestion(null, suggestionMessage.embeds[0], status, reason)).then(p => {
                        console.log(p);
                        updated = true
                        message.reply('Suggestion updated!')
                    }).catch(console.error)
                }
            }
        })

        // Ping that the suggestion's embed was not found
        if (!updated) { message.reply(`Suggestion not found.`) }
    },
}