const Embed = require('@configurations/embed-construct')

module.exports = (client) => {
    client.on('message', async (suggestion) => {
        if (suggestion.channel.id === "793090949529075742" && suggestion.author != client.user) {
            let { channel } = suggestion
            await suggestion.delete()
            let embedMessage = await channel.send(await Embed.suggestion(suggestion))
            embedMessage.react('⬆️')
            setTimeout(() => { embedMessage.react('⬇️') }, 200)
        }
    })
}

module.exports.config = {
    displayName: 'Suggestions handler',
    dbName: 'SUGGESTIONS',
    loadDBFirst: true
}