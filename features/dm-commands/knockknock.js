module.exports = async (client) => {
    client.on('message', async (message) => {
        if ((message.content != 'knock knock') || (message.channel.type !== 'dm')) { return }
        await message.channel.send(`Password?`)
        const filter = m => true
        message.channel.awaitMessages(filter, { max: 1 })
            .then(async collected => {
                m = collected.first()
                if (m.content === process.env.TBA_PASS) {
                    let channel = await client.channels.cache.get(process.env.SUGGESTION_CHANNEL_ID)
                    let invite = await channel.createInvite({ maxUses: 1, unique: true })
                    m.reply(`Welcome. ${invite.url}`)
                } else { m.reply(`Don't waste my time.`) }
            })
    })
}