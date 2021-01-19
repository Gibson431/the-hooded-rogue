const reactionSchema = require('@models/reactionrole-schema')

const cache = new Map()

const loadData = async () => {
    const results = await reactionSchema.find()

    for (const result of results) {
        cache.set(result._id, result.channelId)
    }
}
loadData()

module.exports = {
    requiredPermissions: [
        'ADMINISTRATOR'
    ],
    category: 'Dev Commands',
    description: 'Sets up reaction roles on a message.',
    ownerOnly: true,
    callback: async ({ message }) => {
        // TODO: set up reaction command (maybe)
        const { guild, channel } = message

        await reactionSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            channelId: channel.id,
            channelName: channel.name,
            emojiId: reqString,
            roleId: reqString
        }, {
            upsert: true
        })

        cache.set(guild.id, channel.id, channel.name)

        message.reply(`Welcome channel set!`)
    }
}

module.exports.getChannelId = (guildId) => {
    return cache.get(guildId)
}