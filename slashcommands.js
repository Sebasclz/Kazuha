const fs = require('fs')
require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.token
const clientId = process.env.clientId
const guildId = process.env.guildId

const rest = new REST({ version: '9'}).setToken(token)

createSlash()

async function createSlash(){
    try{
        console.log('Se ha iniciado la actualización de los comandos de la aplicación')
        const commands = []
        fs.readdirSync('./commands').forEach(async (category) => {
            const commandFiles = fs.readdirSync(`./commands/${category}`).filter((archivo) => archivo.endsWith('.js'))
            for (const archivo of commandFiles) {
                const command = require(`./commands/${category}/${archivo}`)
                commands.push(command.data.toJSON())
            }
        }) 
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )
        console.log('Se han recargado correctamente los comandos de la aplicación')
    } catch(x){
        console.error('Ha ocurrido un error al intentar recargar los comandos:\n\n' + x)
    }
}