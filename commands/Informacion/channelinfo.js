const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const config = require('../../config.json')
const capitalize = require('../../functions/capitalize')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('channelinfo')
            .setDescription('Devuelve la informacion de un canal.')
            .addChannelOption(option =>
                option.setName('channel')
                .setDescription('Selecciona el canal.')
                .setRequired(true)),
    async run(client, interaction) {
        try{
            const channel = interaction.options.getChannel('channel') //Recogemos el canal que puso

            const cooldown = {
                0: 'No tiene cooldown',
                5: '5 segundos',
                10: '10 segundos',
                15: '15 segundos',
                30: '30 segundos',
                60: '1 minuto',
                120: '2 minutos',
                300: '5 minutos',
                600: '10 minutos',
                900: '15 minutos',
                1800: '30 minutos',
                3600: '1 hora',
                7200: '2 horas',
                21600: '6 horas'
            }

            const nameChannel = capitalize(`${Discord.Util.escapeMarkdown(channel.name)}`)
            
            const channelType = channel.type

            if(channelType === 'GUILD_TEXT'){
            const embed = new Discord.MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setTitle(`Informacion del canal de texto: ${nameChannel}`)
            .addField('Nombre', "```" + `${nameChannel}` + "```", true)
            .addField('ID del canal', "```" + `${channel.id}` + "```", true)
            .addField('¿NSFW?', "```" + `${channel.nsfw === false ? "No" : "Si"}` + "```", true)
            .addField('Tipo del canal', "```" + `${channel.type === 'GUILD_VOICE' ? "Canal de voz" : "Canal de texto"}` + "```", true)
            .addField(`Tema del canal`, "```" + `${channel.topic < 1 ? "No hay un tema" : channel.topic}` + "```", true)
            .addField(`Su categoria es`, "```" + `${channel.parent.name}` + "```", true)
            .addField(`Cooldown del canal`, "```" + `${cooldown[channel.rateLimitPerUser]}` + "```", false)
            .addField(`Posicion del canal`, "```" + `${channel.rawPosition}` + "```", false)
            return interaction.reply({ embeds: [embed]})

            } else if(channelType === 'GUILD_VOICE'){
                const bitrate = channel.bitrate

                const embed = new Discord.MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setTitle(`Informacion del canal de voz: ${nameChannel}`)
            .addField('Nombre', "```" + `${nameChannel}` + "```", true)
            .addField('ID del canal', "```" + `${channel.id}` + "```", true)
            .addField('Tipo del canal', "```" + `${channel.type === 'GUILD_VOICE' ? "Canal de voz" : "Canal de texto"}` + "```", true)
            .addField(`Su categoria es`, "```" + `${channel.parent.name}` + "```", true)
            .addField(`Posicion del canal`, "```" + `${channel.rawPosition}` + "```", true)
            .addField(`Region del canal`, "```" + `${channel.rtcRegion === null ? 'No tiene asignado una region' : channel.rtcRegion}` + "```", true)
            .addField(`Limites de usuarios`, "```" + `${channel.userLimit === 0 ? 'No tiene limite de usuarios' : channel.userLimit}` + "```", false)
            .addField(`Tasa de bits del canal`, "```" + `${bitrate.toString().replace('000', 'kbps')}` + "```", false)
            return interaction.reply({ embeds: [embed]})

            } else {
                
                const embedError = new Discord.MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle('Error')
                .setDescription('Has seleccionado una categoria o algo ha salido mal, ejecute el comando nuevamente.')

                return interaction.reply({ embeds: [embedError]})
            }
        } catch(e){
            console.log(e)
            interaction.reply({ embeds: [
                new Discord.MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle('Error')
                .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                .setTimestamp()
                .setFooter(interaction.user.username, interaction.user.avatarURL())
            ]})
        };
    }
}