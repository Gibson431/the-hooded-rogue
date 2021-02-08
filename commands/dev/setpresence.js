module.exports = {
    commands: ['setpresence', 'sp'],
    category: 'Dev Commands',
    description: 'Sets the bot\'s presence.',
    minArgs: 1,
    defaultArgs: '<"dnd" or "invisible" or "online"> ["-m" message]',
    ownerOnly: true,
    callback: function ({message, args, text, client, prefix, instance}) {
        let statusMessage = null
        if (text.includes('-m')) {
            statusMessage = text.split('-')[1].slice(2)
        }
        client.user.setPresence({
            status: args[0],
            activity: {
                name: statusMessage,
                type: 'PLAYING'
                // type: 4
            }
        }).then(p => {
            console.log(p);
            message.reply(`Presence updated`)
        }).catch(err => {
            console.log(err);
            message.reply(err)
        })
    },
}