const sleep = (delay) => new Promise((resolve) => { setTimeout(resolve, delay) })

module.exports = {
    category: 'Dev Commands',
    description: 'Uhhhhh don\'t use this...',
    ownerOnly: true,
    callback: async ({message, args, text, client, prefix, instance}) => {
        let channels = message.guild.channels.cache.array()
        deleteMessage = await message.channel.send('Deleting all channels...')
        if (message.guild.id != '713308753788796969') {
            for (const channel of channels) {
                if (channel.id !== message.channel.id) {
                    await channel.delete()
                    await sleep(500)
                }
            }

            await deleteMessage.delete()
            completeMessage = await message.reply('Server cleared.')
            await sleep(2000)
            completeMessage.delete()
            message.delete()

        } else { message.reply(`Don't do that...`)}
    },
    permissions: ['ADMINISTRATOR']
}