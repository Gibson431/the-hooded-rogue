module.exports = {
    commands: ['setpresence', 'sp'],
    category: 'Dev Commands',
    minArgs: 1,
    defaultArgs: '<"dnd" || "invisible" || "online"> ["-m" message]',
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
    ownerOnly: true
}