const { getChannelId } = require('@commands/admin/setlogging')
const { deletedMessage } = require('@configurations/embed-construct')

module.exports = (client) => {
    client.on('messageDelete', async (message) => {
        // message = await message.channel.messages.fetch(message.id)
        const { guild } = message

        let isBot = message.author ? message.author.bot : true
        if (isBot === true || message.channel.parentID === "740526952401731646") { console.log(`Unknown message deleted at :${new Date()}`); return }

        const channelId = getChannelId(guild.id)
        if (!channelId) { return }

        const channel = guild.channels.cache.get(channelId)
        if (!channel) { return }

        channel.send(deletedMessage(message))
    })
}

module.exports.config = {
    displayName: 'Deleted Message Logging',
    dbName: 'MESSAGE-LOG',
    loadDBFirst: false
}