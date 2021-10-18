const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
   .setName('lyrics')
            .setDescription('Muestra la letra de una cancion')
            .addStringOption(option => option.setName('song')
            .setDescription('Ingresa el nombre de la cancion.')
            .setRequired(true)),
            async run(client, interaction){
                try{
                    const song = interaction.options.getString('song') //Recogemos la cancion que el usuario coloco 
                    const res = await fetch(`https://some-random-api.ml/lyrics?title=${song}`) //Llamamos a la API
                    const json = await res.json(); //Lo convertimos en un JSON para sacar los datos

                    if(json.lyrics === undefined){ //Embed por si no encuentra la cancion
                        const embedError = new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('No se ha encontrado la cancion. Por favor intentelo nuevamente.')
                        .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
                        .setTimestamp()

                        return interaction.reply({ embeds: [embedError]}) //Enviamos el embed
                    }

                    const embed = new MessageEmbed() //Creamos el embed con la letra de la cancion
                    .setColor(config.defaultSuccessColor)
                    .setTitle(`${json.title}`)
                    .setURL(`${json.links.genius}`)
                    .setDescription(`${json.lyrics}`)
                    .setThumbnail(`${json.thumbnail.genius}`)
                    .setFooter(`${json.author}`)
                    .setTimestamp()

                    return interaction.reply({ embeds: [embed], ephemeral: true}).catch(() => {
                        const embedError = new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('Ha surgido un error inesperado, por favor intente nuevamente.')
                        .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
                        .setTimestamp()

                        return interaction.reply({ embeds: [embedError]}) //Enviamos el embed
                    }) //Enviamos el embed con la cancion
                
                } catch{ //Si la letra supera los 2048 caracteres, no se encontro la cancion o algun otro error avisara al usuario.
                    const embedError = new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('La letra supera los 2048 caracteres o ha ocurrido un error. Por favor intentelo nuevamente.')
                        .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
                        .setTimestamp()

                        return interaction.reply({ embeds: [embedError]}) //Enviamos el embed
                    }
                }
            }