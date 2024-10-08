const {Client, Intents, Collection} = require('discord.js') 
require('dotenv').config() 
const { setInterval } = require('timers') 
//const apiToken = process.env.topGGToken
//const { AutoPoster } = require('topgg-autoposter')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]})

//AutoPoster(`${apiToken}`, client)

client.commands = new Collection()
client.selectMenus = new Collection()

setInterval(() => { 
    updateStatus()
}, 15000)

async function updateStatus(){ 
    const promises = [ 
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
    ]
    Promise.all(promises).then(results => { 
        const guildNum = results[0].reduce((acc, guildCount) => acc + guildCount, 0)
        const memberNum = results[1].reduce((acc, memberCount) => acc + memberCount, 0)

        client.user.setActivity(`${guildNum} Guilds | ${memberNum} Members`, { type: "LISTENING" }) 
    }).catch(console.error) 
}


require("./handlers/events.js")(client); 
require("./handlers/commands.js")(client);
require("./handlers/selectmenus.js")(client);

client.login()