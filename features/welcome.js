const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('@commands/admin/setwelcome')
const { timeStamp } = require('console')

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        const { guild } = member

        const channelId = getChannelId(guild.id)
        if (!channelId) {
            return
        }

        const channel = guild.channels.cache.get(channelId)
        if (!channel) { return }

        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext('2d')

        let padding = 25

        // Draw background
        const background = await Canvas.loadImage(
            path.join(__dirname, '../assets/background.png')
        )
        let x = 0
        let y = 0
        ctx.drawImage(background, x, y)

        // Draw pfp
        const pfp = await Canvas.loadImage(
            member.user.displayAvatarURL({
                format: 'png'
            })
        )
        ctx.drawImage(pfp, padding, padding, canvas.height - padding * 2, canvas.height - padding * 2)
        pfp.width = canvas.height - padding * 2
        pfp.height = canvas.height - padding * 2

        // Draw welcome text
        ctx.fillStyle = '#ffffff'
        ctx.font = '35px sans-serif'
        let text = member.user.tag
        x = pfp.width + padding * 2
        ctx.fillText(text, x, padding * 2)

        // Draw member count
        ctx.font = '30px sans-serif'
        text = `Member #${guild.memberCount}`
        x = pfp.width + padding * 2
        ctx.fillText(text, x, ctx.measureText(text).emHeightAscent + padding * 3)

        // Draw account age
        ctx.font = '30px sans-serif'
        let timeStamp = member.user.createdAt
        let today = new Date()
        let difference = today - timeStamp
        text = `Acc. Age: ${Math.floor(difference/31556952000)}y ${Math.floor((difference%31556952000)/2629800000)}m ${Math.floor((difference%2629800000)/86400000)}d`
        x = pfp.width + padding * 2
        ctx.fillText(text, x, ctx.measureText(text).emHeightAscent + padding * 4 + 10)



        // Attach image
        const attachment = new MessageAttachment(canvas.toBuffer())
        channel.send('', attachment)
    })
}

module.exports.config = {
    displayName: 'Welcome Messages',
    loadDBFirst: true
}