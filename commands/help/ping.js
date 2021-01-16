module.exports = {
    commands: ['ping', 'status'],
    category: 'Help',
    description: 'Checks the bot\'s online status',
    minArgs: 0,
    maxArgs: 0,
    callback: ({message, args, text, client, prefix, instance}) => {
        message.reply(`my status is currently set to: ${String(client.presence.status)}`)
    }
}