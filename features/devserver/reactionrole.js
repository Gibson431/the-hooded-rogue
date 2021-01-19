module.exports = (client) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        const { message } = reaction
        // TODO: set up reaction roles (maybe)
    })
}

module.exports.config = {
    displayName: 'Reaction roles',
    loadDBFirst: true
}