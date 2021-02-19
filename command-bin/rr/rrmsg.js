const reactionSchema = require('@models/reaction-role-schema')
const { addToCache } = require('@features/devserver/reaction-roles')

module.exports = {
    commands: ['rrmsg'],
    category: 'Dev Commands',
    description: 'Adds an initial role menu message to a channel',
    minArgs: 1,
    expectedArgs: '[Channel tag] <Message text>',
    requiredPermissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    callback: async ({ message, args }) => {
        const { guild, mentions } = message
        const { channels } = mentions
        const targetChannel = channels.first() || message.channel

        if (channels.first()) {
            args.shift()
        }

        const text = args.join(' ')

        const newMessage = await targetChannel.send(text)

        if (guild.me.hasPermission('MANAGE_MESSAGES')) {
            message.delete()
        }

        if (!guild.me.hasPermission('MANAGE_ROLES')) {
            message.reply(
                'The bot requires access to manage roles to be able to give or remove roles'
            )
            return
        }

        addToCache(guild.id, newMessage)

        new reactionSchema({
            guildId: guild.id,
            channelId: targetChannel.id,
            messageId: newMessage.id,
        })
            .save()
            .catch(() => {
                message
                    .reply('Failed to save to the database, please report this!')
                    .then((message) => {
                        message.delete({
                            timeout: 1000 * 10,
                        })
                    })
            })
    },
}