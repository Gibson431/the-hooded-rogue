module.exports = {
    commands: ['sgj'],
    ownerOnly: true,
    category: 'Dev Commands',
    description: 'Simulates the bot being added to a server.',
    callback: ({ message, client }) => {
        const { guild } = message
        message.reply(`Simulating adding the bot to a new server...`)
        client.emit('guildCreate', guild)
    }
}