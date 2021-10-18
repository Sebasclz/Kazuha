const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const figlet = require('figlet')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ascii')
                .setDescription('El bot convertira en ascii el texto que vos le digas.')
                .addStringOption(option =>
                option.setName('text')
                .setDescription('El texto a convertir en ascii')
                .setRequired(true)),
        async run(client, interaction){
            try{
                const ascii = interaction.options.getString('text') //Recogemos lo que puso el usuario
                
                if(ascii.length > 15) return interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('El texto no puede superar los 15 caracteres') //Si lo que puso tiene mas de 15 caracteres retornamos un error
                ]})

                //Si todo sale bien convertimos en ASCII el texto y lo enviamos
                figlet(ascii, (err, data) => interaction.reply({ content: '```' + data + '```', ephemeral: true}))
            } catch (e){ //Si da error le avisamos al usuario y lo reportamos al servidor
                console.error(e)
                interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                    .setTimestamp()
                    .setFooter(interaction.user.username, interaction.user.avatarURL())
                ]})
                client.channels.cache.get("893282453232418847").send({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription(`Ha ocurrido un error en:\n Nombre de servidor: ${interaction.guild.name}\n ID de servidor ${interaction.guild.id}\n Nombre del usuario que ejecuto el comando: ${interaction.user.username}\n ID del usuario que ejecuto el comando: ${interaction.user.id}\n\n\n Error: \`${e}\``)
                ]})
            };
        }
    }
 