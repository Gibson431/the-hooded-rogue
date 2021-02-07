const Embed = require('@configurations/embed-construct')

module.exports = (client) => {
    const errorChannel = client.channels.cache.get(process.env.ERROR_CHANNEL_ID)
    client.on('error', (err) => {
        // client.destroy()
        // client.login(process.env.CLIENT_TOKEN).then((p) => { console.log(err); errorChannel.send(Embed.error(err)) });
        console.log(`Client Error:\n${err}`)
        errorChannel.send(Embed.error(err))
    })
}

module.exports.config = {
    displayName: 'Error logging and client restart',
    loadDBFirst: false,
    dbName: 'ERROR-LOG'
}