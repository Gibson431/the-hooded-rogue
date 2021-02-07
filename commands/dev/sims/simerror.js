module.exports = {
    commands: ['simerror'],
    category: 'Dev Commands',
    description: 'Simulates an error',
    ownerOnly: true,
    callback: ({message, args, text, client}) => {
        message.reply(`Testing error...`)
        client.emit('error', `Test error`)
    }
}