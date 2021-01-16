module.exports = {
    commands: ['cg'],
    ownerOnly: true,
    callback: ({message, args}) => {
        if (args.length != 1) { message.reply('Incorrect usage'); return }
        let name = args[0]
        
        message.reply('inserisci il nome del ruolo');
        
        let filter = (msg) => msg.author.id === message.author.id
        
        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
        .then((collected) => {
            userMessage = collected.first()
            roleName = userMessage.content
            if (roleName == 'cancel') { message.reply("hai annullato la creazione del ruolo."); return }
            message.guild.roles.create({ data: { name: roleName } })
            .then(categoryRole => {
                message.guild.channels
                .create(name, {
                    type: 'category',
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: categoryRole.id,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                .then((channel) => {
                    let channelID = channel.id;
                    console.log(`Category Id: ${channelID}`)
                    
                    if (channelID == null) {
                        console.log('The var is empty');
                    }
                    
                    message.guild.channels
                    .create('Chat', {
                        type: 'text',
                        parent: channelID
                    })
                    
                    for (let i = 1; i < 6; i++) {
                        message.guild.channels
                        .create('Vocal ' + i, {
                            type: 'voice',
                            parent: channelID
                        })
                        
                    }
                    name = ''
                }).then(message.channel.send("Ruolo creato!"))
                
            })
            .catch(err => { if (err) { message.channel.send(`Error creating role. Error: \`${err}\``) } })
        })
    }
}