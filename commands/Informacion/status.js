const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const moment = require('moment')
const osu = require('node-os-utils')
const os = require('os')
require('moment-duration-format')
const diagramMaker = require('../../functions/diagramMaker.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('status')
                .setDescription('Devuelve el estado del bot.'),
    async run(client, interaction){
        try{
            await interaction.reply({ content: 'Obteniendo estado...'})
            
            let cpuUsage
            const cpu = osu.cpu

            const promises= [
                client.shard.fetchClientValues('guilds.cache.size'),
                client.shard.fetchClientValues('emojis.cache.size'),
                client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
                cpu.usage().then(cpuPercentage => {
                    cpuUsage = cpuPercentage
                })
            ]

            Promise.all(promises).then(async results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0)
                const totalEmojis = results[1].reduce((acc, emojisCount) => acc + emojisCount, 0)
                const totalMembers  = results[2].reduce((acc, memberCount) => acc + memberCount, 0)
                var mem =  osu.mem
                let freeRAM, usedRAM
    
                await mem.info().then(info => {
                    freeRAM = info['freeMemMb']
                    usedRAM = info['totalMemMb'] - freeRAM
                })
    
                const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setAuthor(`Estado de ${client.user.username}`)
                    .setThumbnail(client.user.displayAvatarURL({format: 'png', dynamic: true, size: 4096}))
                    .addField(`📡 Rendimiento`, "```" + `RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round((100 * usedRAM) / (usedRAM + freeRAM))}%]\nCPU: ${diagramMaker(cpuUsage, 100 - cpuUsage)} [${Math.round(cpuUsage)}%]` + "```", false)
                    .addField(`💻 Sistema`, "```" + `\n Procesador: Intel \n RAM Total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB` + "```", false)
                    .addField(`💻 Sistema operativo`, "```" + `${os.type} ${os.release} ${os.arch}` + "```", false)
                    .addField(`🙋‍♂️ Total de usuarios`, "```" + `${totalMembers}` + "```", true)
                    .addField(`😎 Total de emojis`, "```" + `${totalEmojis}` + "```", true)
                    .addField(`💬 Total de servidores`, "```" + `${totalGuilds}` + "```", true)
                    .addField(`⏳ Tiempo de actividad del bot`, "```" + `${moment.duration(client.uptime).format([`D [Dias], H [Horas], m [Minutos], s [Segundos]`])}` + "```", true)
                    .addField(`⏳ Tiempo de actividad del host`, "```" + `${moment.duration(os.uptime * 1000).format([`D [Dias], H [Horas], m [Minutos], s [Segundos]`])}` + "```", true)
                    .addField(`⏳ Ultimo inicio`, "```" + `${moment(client.readyAt).format("DD MMM YYYY HH:mm a")}` + "```", true)
                interaction.editReply({ content: ' ', embeds: [embed] }) 
            })
            } catch(e){
                console.error(e)
                interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                    .setTimestamp()
                    .setFooter(interaction.user.username, interaction.user.avatarURL())
                ]})
            };
    }
}