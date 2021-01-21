module.exports = {
    commands: ['sgj'],
    ownerOnly: true,
    callback: ({ message, client }) => {
        const { guild } = message
        message.reply(`Simulating adding the bot to a new server...`)
        client.emit('guildCreate', guild)
    }
}