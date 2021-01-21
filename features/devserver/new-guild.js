const Embed = require("@configurations/embed-construct")

module.exports = (client) => {
    client.on('guildCreate', async (newGuild) => {
        const systemChannel = await client.channels.cache.get('782868510979784724') // TODO: put this in .env
        systemChannel.send(Embed.guildCreate(newGuild))
    })
}

module.exports.config = {
    displayName: 'Log when bot joins new server',
    loadDBFirst: false
}