const {serverInfo} = require('@configurations/embed-construct')

module.exports = {
    commands: ['serverinfo'],
    category: 'Help',
    discription: 'Displays the servers analitics.',
    callback: ({message}) => {
        message.reply(serverInfo(message))
    }
}