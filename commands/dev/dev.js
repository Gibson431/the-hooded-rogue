module.exports = {
    commands: ['dev'],
    category: 'Dev Commands',
    description: 'Unknown',
    ownerOnly: true,
    callback: function ({message, args, text, client, prefix, instance}) {
        message.reply(text ? eval(text) : `No command given.`)
        console.log(instance);
    }
}