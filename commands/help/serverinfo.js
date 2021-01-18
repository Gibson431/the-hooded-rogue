const {serverInfo} = require('@configurations/embed-construct')

module.exports = {
    commands: ['serverinfo'],
    category: 'Help',
    description: 'Displays the servers analitics.',
    callback: ({message}) => {
        message.reply(serverInfo(message))
    }
}