// configure .env file
try {
    const envResult = require('dotenv').config();
    if (envResult.error) {
        if (process.env.EXTERNAL == 'true') { console.log('Heroku environment loaded successfully.') }
        else { console.log(`Environment loading failed:\n` + envResult.error) }
    } else {
        console.log(`Local environment loaded successfully.`)
    };
} catch (err) { console.log(err.name + ': ' + err.message) };

// Configure module aliases
require('module-alias/register')


// Import Discord and WOKCommands
const Discord = require('discord.js')
const WOKCommands = require('wokcommands')

// Import the embed handler
const Embed = require('@configurations/embed-construct')

var errorChannel

// Create a new client
const client = new Discord.Client({
    partials: ['REACTION', 'MESSAGE'],
    presence: {
        status: process.env.EXTERNAL === 'true' ? 'online' : 'dnd',
        activity: {
            type: process.env.EXTERNAL === 'PLAYING',
            name: process.env.EXTERNAL === 'true' ? 'with new features' : `'Development'`,
        }
    }
})

client.on('ready', () => {
    console.log(`Client ready as ${client.user.tag}`)

    errorChannel = client.channels.cache.get(process.env.ERROR_CHANNEL_ID)
    
    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features',
        messagesPath: 'configurations/messages.json',
        testServers: [process.env.TBA_ID]
    })
        .setDefaultPrefix('~')
        .setBotOwner(process.env.OWNER_ID)
        .setDefaultLanguage('english')
        .setMongoPath(process.env.MONGO_URI)
        .setCategorySettings([
            {
                name: 'Configuration',
                hidden: 'true',
            },
            {
                name: 'Ciphers',
                emoji: '🕵️',
            },
            // {
            //     name: 'Dev Commands',
            //     emoji: '🚫',
            //     hidden: 'true',
            // },
            {
                name: 'Randomizers',
                emoji: '🎲',
            },
            {
                name: 'Math',
                emoji: '🧮',
            }
        ])
        .setColor(0x000000)
})

process.on('unhandledRejection', async err => {
    console.log(err)
    errorChannel.send(await Embed.error(err))
})

// Start the bot
client.login(process.env.CLIENT_TOKEN)