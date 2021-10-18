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
            .addField(`Su categoria es`, "```" + `${channel.parent.name}` + "```", false)
            return interaction.reply({ embeds: [embed]})

            } else if(channelType === 'GUILD_VOICE'){
                const embed = new Discord.MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setTitle(`Informacion del canal de voz: ${nameChannel}`)
            .addField('Nombre', "```" + `${nameChannel}` + "```", true)
            .addField('ID del canal', "```" + `${channel.id}` + "```", true)
            .addField('¿NSFW?', "```" + `${channel.nsfw === false ? "No" : "Si"}` + "```", true)
            .addField('Tipo del canal', "```" + `${channel.type === 'GUILD_VOICE' ? "Canal de voz" : "Canal de texto"}` + "```", true)
            .addField(`Su categoria es`, "```" + `${channel.parent.name}` + "```", false)
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