var stringify = require('json-stringify-safe');

module.exports = {
    commands: ['dev'],
    category: 'Dev Commands',
    description: 'Unknown',
    ownerOnly: true,
    callback: function ({ message, args, text, client, prefix, instance }) {
        result = eval('result = ' + text)
        stringResult = stringify(result)
        message.channel.send(result ? (stringResult.length > 2000 ? 'Result too long, check the heroku console.' : stringResult) : `No result evaluated.`)
        console.log(result);
    }
}