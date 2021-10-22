const {Client, Intents, Collection} = require('discord.js') //Llamamos al NPM de Discord.js
require('dotenv').config() //Llamamos al NPM dotenv
const { setInterval } = require('timers') //Necesitamos el setInterval para actualizar el estado del bot cada cierto tiempo

//Intents para que funcione bien todos los comandos del bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]})

//Creamos las colecciones de los comandos y selectmenus 
client.commands = new Collection()
client.selectMenus = new Collection()

setInterval(() => { //Cada 10 minutos se actualizara el estado
    updateStatus()
}, 60000)

async function updateStatus(){ //Creamos la funcion de actualizar el estado
    const promises = [ //Creamos una promesa que recoja de todas las shards, la cantidad de servidores y los miembros en total
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
    ]
    Promise.all(promises).then(results => { //Sumamos cada uno de los servidores y miembros
        const guildNum = results[0].reduce((acc, guildCount) => acc + guildCount, 0)
        const memberNum = results[1].reduce((acc, memberCount) => acc + memberCount, 0)

        const activity = [
            {
                name: '/help',
                type: 'LISTENING'
            },
            {
                name: `Servidores: ${guildNum} Miembros: ${memberNum}`,
                type: 'WATCHING'
            },
            {
                name: 'como estoy alojado en PyroNode',
                type: 'WATCHING'
            }
        ]

        client.user.setActivity(activity[Math.floor(Math.random() * activity.length)]) //Creamos la actividad del bot
    }).catch(console.error) //Si hay error no los dira
}

//Requerimos la carpeta events, commands, selectmenus al ejecutar el bot
require("./handlers/events.js")(client); 
require("./handlers/commands.js")(client);
require("./handlers/selectmenus.js")(client);

client.login()