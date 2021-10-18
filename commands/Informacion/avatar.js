const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('avatar')
                .setDescription('Te muestra el avatar del usuario mencionado')
                .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario para mostrar su avatar')),
    async run(client, interaction){
        try{
            const user = interaction.options.getUser('usuario') //Recogemos el usuario mencionado
            if (user) { //Si hay usuario devolvere el avatar del usuario mencionado
                const embedMention = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`El avatar de ${user} es:`)
                    .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
                interaction.reply({ embeds: [embedMention], components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Avatar del usuario')
                        .setStyle('LINK')
                        .setURL(`${user.avatarURL({ dynamic: true, size: 4096 })}`)
                        .setEmoji('👤')
                        )] 
                    })
            } else { //Si no hay se devuelve el avatar del autor de la interaccion
                const embedNoMention = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`Tu avatar es:`)
                    .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 4096
                    }))
                interaction.reply({ embeds: [embedNoMention], components: [
                    new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Avatar del usuario')
                            .setStyle('LINK')
                            .setURL(`${interaction.user.avatarURL({ dynamic: true, size: 4096 })}`)
                            .setEmoji('👤')
                            )]
                        })
                    }
            } catch(e){ //Si hay error lo reportamos y le avisamos al usuario
                console.error(e)
                interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                    .setTimestamp()
                    .setFooter(interaction.user.username, interaction.user.avatarURL())
                ]})
            }
            }
    }
