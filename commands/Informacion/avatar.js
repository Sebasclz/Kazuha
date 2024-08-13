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
            
            const user = interaction.options.getUser('user')
            
            if(user){ //Si menciona a alguien

            const avatarMention = user.displayAvatarURL({ dynamic: true}) //Si el avatar es gif

            if(avatarMention.endsWith('.gif') === true ){ //Si el avatar es un gif hara lo siguiente
                
                //Botones para la descarga del avatar
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('PNG')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ format: 'png', size: 4096})}`),

                        new MessageButton()
                        .setLabel('JPG')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ format: 'jpg', size: 4096})}`),

                        new MessageButton()
                        .setLabel('WEBP')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ format: 'webp', size: 4096})}`),

                        new MessageButton()
                        .setLabel('GIF')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ dynamic: true, format: 'gif', size: 4096})}`),
                    )

                const embed = new MessageEmbed() //Creamos embed
                .setColor(config.defaultSuccessColor)
                .setDescription(`El avatar de ${user} es:`)
                .setImage(user.displayAvatarURL({ dynamic: true, size: 4096, format: 'gif' }))

                return interaction.reply({ embeds: [embed], components: [row] }) //Ponemos los avatars con sus respectivos links

            } else if(avatarMention.endsWith('.gif') === false ) { //Si el avatar no es un gif hara lo siguiente

                //Botones para la descarga del avatar
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('PNG')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ format: 'png', size: 4096})}`),

                        new MessageButton()
                        .setLabel('JPG')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ format: 'jpg', size: 4096})}`),

                        new MessageButton()
                        .setLabel('WEBP')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ format: 'webp', size: 4096})}`),

                        new MessageButton()
                        .setLabel('GIF')
                        .setStyle('LINK')
                        .setURL(`${user.displayAvatarURL({ format: 'gif', size: 4096})}`)
                        .setDisabled(),
                    )

                const embed = new MessageEmbed() //Creamos embed
                .setColor(config.defaultSuccessColor)
                .setDescription(`El avatar de ${user} es:`)
                .setImage(user.displayAvatarURL({ dynamic: false, size: 4096, format: 'png' }))

                return interaction.reply({ embeds: [embed], components: [row] }) //Ponemos los avatars con sus respectivos links

            }
        
        } else { //Si no menciona un usuario

            const avatarNoMention = interaction.user.displayAvatarURL({ dynamic: true })

            if(avatarNoMention.endsWith('.gif') === true ){ //Si el avatar es un gif hara lo siguiente
                
                //Botones para la descarga del avatar
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('PNG')
                        .setStyle('LINK')
                        .setURL(`${interaction.user.displayAvatarURL({ format: 'png', size: 4096})}`),

                        new MessageButton()
                        .setLabel('JPG')
                        .setStyle('LINK')
                        .setURL(`${interaction.user.displayAvatarURL({ format: 'jpg', size: 4096})}`),

                        new MessageButton()
                        .setLabel('WEBP')
                        .setStyle('LINK')
                        .setURL(`${interaction.user.displayAvatarURL({ format: 'webp', size: 4096})}`),

                        new MessageButton()
                        .setLabel('GIF')
                        .setStyle('LINK')
                        .setURL(`${interaction.user.displayAvatarURL({ dynamic: true, format: 'gif', size: 4096})}`),
                    )

                const embed = new MessageEmbed() //Creamos embed
                .setColor(config.defaultSuccessColor)
                .setDescription(`Tu avatar es:`)
                .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png'}))

                return interaction.reply({ embeds: [embed], components: [row] }) 
                
            } else if(avatarNoMention.endsWith('.gif') === false ) { //Si el avatar no es un gif hara lo siguiente
                
                //Botones para la descarga del avatar
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('PNG')
                    .setStyle('LINK')
                    .setURL(`${interaction.user.displayAvatarURL({ format: 'png', size: 4096})}`),

                    new MessageButton()
                    .setLabel('JPG')
                    .setStyle('LINK')
                    .setURL(`${interaction.user.displayAvatarURL({ format: 'jpg', size: 4096})}`),

                    new MessageButton()
                    .setLabel('WEBP')
                    .setStyle('LINK')
                    .setURL(`${interaction.user.displayAvatarURL({ format: 'webp', size: 4096})}`),

                    new MessageButton()
                    .setLabel('GIF')
                    .setStyle('LINK')
                    .setURL(`${interaction.user.displayAvatarURL({ format: 'gif', size: 4096})}`)
                    .setDisabled(),
                )

            const embed = new MessageEmbed() //Creamos embed
            .setColor(config.defaultSuccessColor)
            .setDescription(`Tu avatar es:`)
            .setImage(interaction.user.displayAvatarURL({ dynamic: false, size: 4096, format: 'png'}))

            return interaction.reply({ embeds: [embed], components: [row] })

            }
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
