const Embed = require("@configurations/embed-construct")

module.exports = (client) => {
    client.on('guildCreate', async (newGuild) => {
        const systemChannel = await client.channels.cache.get(process.env.SYSTEM_ID)
        systemChannel.send(Embed.guildCreate(newGuild))
    })
}

module.exports.config = {
    displayName: 'Log when bot joins new server',
    loadDBFirst: false
}