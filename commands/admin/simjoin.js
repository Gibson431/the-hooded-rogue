module.exports = {
    category: 'Configuration',
    description:'Tests the server\'s response to a member joining',
    requiredPermissions: ['ADMINISTRATOR'],
    callback: ({message, args, text, client}) => {
        message.channel.send(`Simulating **${message.member.user.tag}** joining the server...`)
        client.emit('guildMemberAdd', message.member)
    }
}