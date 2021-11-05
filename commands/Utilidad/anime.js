const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const talkedRecently = new Set();
const mal = require('mal-scraper')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anime')
            .setDescription('Busca informacion de un anime')
            .addStringOption(option =>
                option.setName('name')
                    .setDescription('Introduce el nombre del anime')
                    .setRequired(true)),
            async run(client, interaction){
                try{
                    if (talkedRecently.has(interaction.user.id)) {
                        interaction.reply({ content: `${interaction.user} Tienes que esperar 5 segundos para volver a usar el comando`})
                        setTimeout(() => {
                            interaction.deleteReply()
                          }, 5000);  
                } else {
                    
                const anime = interaction.options.getString('name')

                
                mal.getInfoFromName(anime).then((data) => {
                        const embed = new MessageEmbed()
                        .setTitle(`${data.title}`)
                        .setDescription(`__**Sinopsis:**__\n${data.synopsis}`)
                        .setURL(`${data.url}`)
                        .addField('Titulo en ingles', `${data.englishTitle}`, true)
                        .addField('Titulo en japones', `${data.japaneseTitle}`, true)
                        .addField('Estudio/s', `${data.studios.join(', ')}`, true)
                        .addField('Tipo de anime', `${data.type}`, true)
                        .addField('Duracion', `${data.duration}`, true)
                        .addField('Episodios', `${data.episodes}`, true)
                        .addField('Generos', `${data.genres.join(', ')}`, true)
                        .addField('Clasificacion', `${data.rating}`, true)
                        .addField('Fuente', `${data.source}`, true)
                        .setImage(`${data.picture}`)
                        .setColor(config.defaultSuccessColor)
                        .setFooter(`${data.title}`, interaction.user.avatarURL({ dynamic: true }))
                        .setTimestamp()

                        
                        return interaction.reply({ embeds: [embed], ephemeral: true})
                    })
                
                    
                    talkedRecently.add(interaction.user.id);
                    setTimeout(() => {
                      talkedRecently.delete(interaction.user.id);
                    }, 5000);
                }
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
