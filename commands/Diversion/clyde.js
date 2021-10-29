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

                const embedError = new MessageEmbed() //Creamos el mensaje de Error por si menciona a un bot
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Como maximo puedes poner 25 caracteres a la imagen.')
                
                if(text.length > 25) return interaction.reply({ embeds: [embedError]})
                
                const embed = new MessageEmbed() //Regresamos el embed con la imagen
                .setImage(`https://ctk-api.herokuapp.com/clyde/${text}`)
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
 