const Discord = require('discord.js')
const Sourcebin = require('sourcebin')

exports.serverInfo = (message) => {
    const { guild } = message
    const { name, region, memberCount, owner } = guild
    const icon = guild.iconURL()
    return {
        embed: {
            author: {
                name: `Server information for ${name}`,
            },
            fields: [
                {
                    name: 'Region',
                    value: region,
                },
                {
                    name: 'Member Count',
                    value: memberCount,
                },
                {
                    name: 'Server Owner',
                    value: owner.user.tag
                }
            ],
            thumbnail: {
                url: icon
            },
            timestamp: new Date(),
            footer: {
                text: `Requested by ${message.author.tag}`,
                iconURL: message.author.avatarURL()
            }
        }
    }
}

exports.baseConfessionEmbed = new Discord.MessageEmbed()
    .setAuthor('Anonymous Confession', 'https://cdn.discordapp.com/icons/737374214067322910/99f7f3db057a35dfcc281ce598a5438f.png?size=128')
    .setTimestamp()
    .setFooter("DM me '~confess' to confess");

exports.baseLogConfessionEmbed = new Discord.MessageEmbed()
    .setTimestamp()
    .setFooter("Confession intercepted en route to server: Ahehe")

exports.baseReplyConfessionEmbed = new Discord.MessageEmbed()
    .setTimestamp()
    .setAuthor("Confession >> Ahehe", 'https://cdn.discordapp.com/icons/737374214067322910/99f7f3db057a35dfcc281ce598a5438f.png?size=128')

exports.deletedMessage = (message) => {
    embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor('#485063')
        .setAuthor(`${message.author ? message.author.tag : `Unknown`}'s message deleted in channel: ${message.channel.name}`, message.author ? message.author.displayAvatarURL() : null)

    if (message.attachments.size > 0) {
        message.attachments.every(file => {
            embed.setImage(file.proxyURL)
            embed.setDescription(`\`${message.content}\`\n${file.url}`)
        })
    }
    else { embed.setDescription(`\`${message.content}\``) }

    return embed
}

exports.confessionsAlert = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#FF0000")
    .setAuthor("Confessions Update")

exports.error = async (err, message = null) => {
    const res = await Sourcebin.create(
        [
            {
                content: JSON.stringify(err),
                language: 'R',
            },
        ],
        {
            title: 'THR Error',
            description: err.code,
        }
    )

    console.log(JSON.stringify(err));
    console.log(res);

    return {
        embed: {
            color: 0xFF0000,
            timestamp: new Date(),
            author: {
                name: "Error",
                icon_url: message ? message.author.displayAvatarURL() : null
            },
            description: message ? (`**Cause:**\n> ${message.content}\n**Author:**\n> ${message.author.username}\n**Error code:**\n` + '```' + err + '```') : `\`\`\`${err}\`\`\``,
            fields: [
                {
                    name: 'Sourcebin Link',
                    value: res.url
                }
            ]
        }
    }
}

exports.permissionError = (message, perm) => {
    return {
        embed: {
            color: 0xFF0000,
            timestamp: new Date(),
            author: {
                name: "Error: Missing Permissions",
                icon_url: message.author.displayAvatarURL()
            },
            description: `You don't have the required permissions for this action.\n\nMissing permission: **${perm}**`
        }
    }
}

exports.cipherError = (err) => {
    return {
        embed: {
            color: 0xFF0000,
            timestamp: new Date(),
            author: {
                name: "Error while using cipher."
            },
            description: err
        }
    }
}

exports.suggestion = async (suggestion, embed = null, status = `undecided`, reason) => {
    let color

    switch (status) {
        case 'undecided':
            color = 0xfcd303
            statusMessage = `🕓 Waiting for community feedback, please vote!`
            break;
        case 'a':
        case 'accept':
        case 'accepted':
            color = 0x00FF00
            statusMessage = `✅ Suggestion accepted, check <#740527234799894529> to see it's progress`
            break;
        case 'd':
        case 'deny':
        case 'denied':
            color = 0xFF0000
            statusMessage = `❌ Suggestion rejected${reason ? `, Reason: ${reason}` : ``}`
            break;
        default:
            break;
    }

    return {
        embed: {
            color,
            author: {
                name: embed ? embed.author.name : suggestion.author.tag,
                icon_url: embed ? embed.author.iconURL : suggestion.author.displayAvatarURL()
            },
            description: embed ? embed.description : suggestion.content,
            fields: [
                {
                    name: "Status",
                    value: statusMessage
                }
            ]
        }
    }
}

exports.todo = ({ todoText, status, optionalArgs = {}, todoMessage = null }) => {
    let color
    let statusMessage

    console.log(optionalArgs.n);

    switch (status) {
        case 'complete':
            color = 0x00FF00
            statusMessage = `✅ Complete, this feature is currently available. Please check the help menu for more information.`
            break;
        case 'current':
            color = 0xfcd303
            statusMessage = `🕓 In progess. If this is urgent contact the dev.`
            break;
        case 'pain':
            color = 0xFF0000
            statusMessage = `<:angrycry:718815796515700786> Why did you do this to me??!?! \n(I am still working on this, don't worry. It just might take some time)`
            break;
        case 'lock':
            color = 0x000000
            statusMessage = `🔒 This feature has been suspended indefinitely, contact the dev if you need more information.`
            break;
    }

    return {
        embed: {
            color,
            author: {
                name: `TO DO:`,
            },
            description: todoMessage ? todoMessage.embeds[0].description : todoText,
            fields: [
                {
                    name: "Status",
                    value: statusMessage
                }
            ],
            footer: {
                text: optionalArgs.n ? `Note: ${optionalArgs.n}` : null
            }
        }
    }
}

exports.guildCreate = (guild) => {
    return {
        embed: {
            color: 'RANDOM',
            author: {
                name: 'Joined New Server',
                // icon_url: guild.iconURL() ? guild.iconURL() : ''
                icon_url: guild.iconURL()
            },
            description: `**${guild.name}**`,
            fields: [
                {
                    name: `Information:`,
                    value: `Member Count: ${guild.memberCount}
                        Owner: ${guild.owner.displayName}
                        Region: ${guild.region}
                        Partnered? ${guild.partnered}
                        URL: ${guild.vanityURLCode ? guild.vanityURLCode : `This guild has no public invite link.`}`
                }
            ]
        }
    }
}