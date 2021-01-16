module.exports = {
    commands: ['simerror'],
    category: 'Dev Commands',
    description: 'Simulates an error',
    callback: ({message, args, text, client}) => {
        message.reply(`Testing error...`)
        process.emitWarning('UnhandledPromiseRejectionWarning', `Test error`)
    }
}