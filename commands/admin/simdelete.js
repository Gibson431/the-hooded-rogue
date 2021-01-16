module.exports = {
    category: 'Configuration',
    description:'Tests the server\'s response to a message being deleted',
    requiredPermissions: ['ADMINISTRATOR'],
    callback: ({message, args, text, client}) => {
        client.emit('messageDelete', message)
    }
}