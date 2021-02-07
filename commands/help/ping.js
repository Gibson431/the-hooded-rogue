module.exports = {
    commands: ['ping', 'latency'],
    category: 'Help',
    description: 'Ping\'s the bot.',
    callback: ({message, args, text, client, prefix, instance}) => {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}