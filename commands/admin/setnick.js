const nameSchema = require("../../models/name-schema")

const cache = new Map()

const loadData = async () => {
    const results = await nameSchema.find()

    for (const result of results) {
        cache.set(result._id, result.nickname)
    }
}
loadData()


module.exports = {
    commands: ['setnick', 'setnickname', 'updatenick', 'updatenickname'],
    category: 'Configuration',
    description: `Updates and sets the bot's nickname.`,
    minArgs: 0,
    maxArgs: -1,
    expectedArgs: '<new nickname (optional)>',
    // ownerOnly: true,
    requiredPermissions: [
        'ADMINISTRATOR'
    ],
    init: function (client, instance) {
        let prefix
        let nickname
        client.guilds.cache.each(guild => {
            nickname = cache.get(guild.id) ? cache.get(guild.nickname) : 'THR'
            prefix = instance.getPrefix(guild)
            guild.me.setNickname(`${prefix} ${nickname}`)
        })
    },
    callback: async function ({ message, args, instance }) {
        let { guild } = message
        let prefix = instance.getPrefix(guild)
        let nickname = cache.get(guild.id) ? cache.get(guild.nickname) : 'THR'

        if (args.length != 0) {
            nickname = args.join(' ')
            await nameSchema.findOneAndUpdate({
                _id: guild.id
            }, {
                _id: guild.id,
                nickname: nickname
            }, {
                upsert: true
            })

            cache.set(guild.id, nickname)
        }

        guild.me.setNickname(`${prefix} ${nickname}`)
    }
}