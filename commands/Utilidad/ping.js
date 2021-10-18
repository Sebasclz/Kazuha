const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
   .setName('ping')
            .setDescription('Devuelve el retraso entre la API de discord y el bot'),
            async run(client, interaction){
                try{
                    const ping =  Math.floor(client.ws.ping)

                    await interaction.reply({ content: 'Pinging...'})  

                    const pingUser = (Date.now() - interaction.createdTimestamp).toString().replace("-", "")

                        const embed = new MessageEmbed()
                        .setColor(config.defaultSuccessColor)
                        .setTitle(`🏓 Pong!`)
                        .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096}))
                        .setDescription(`**BOT: ` + ping + `ms**\nEste es el ping que tiene el bot con la API de Discord.\n\n**Tu ping: ` + pingUser + `ms**\nEste es el ping que tienes vos con la API de Discord`)
                        .setTimestamp()
                        return interaction.editReply({content: ' ', embeds: [embed]}).catch(() => {
                            const embedError = new MessageEmbed()
                            .setTitle('Error')
                            .setColor(config.defaultErrorColor)
                            .setDescription('Ha ocurrido un error al obtener el ping, por favor intente nuevamente.')
    
                            return interaction.editReply({ content: '', embeds: [embedError]})
                        })

                } catch(e){
                    console.error(e)
                    interaction.editReply({ content: ' ', embeds: [
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
