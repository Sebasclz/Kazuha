const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('clyde')
                .setDescription('Devuelve una imagen con un mensaje de Clyde (El bot de discord)')
                .addStringOption(option =>
                option.setName('text')
                .setDescription('Ingresa el texto')
                .setRequired(true)),
        async run(client, interaction){
            try{
                    
                const text = interaction.options.getString('text') //Recogemos lo que puso el usuari  

                const url = `https://ctk-api.herokuapp.com/clyde/${text}` //Ponemos el texto en la url de la api

                const embed = new MessageEmbed() //Regresamos el embed con la imagen
                .setImage(url)
                .setColor(config.defaultSuccessColor)

                return interaction.reply({ embeds: [embed]})

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
            };
        }
    }
 