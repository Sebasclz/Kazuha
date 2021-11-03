const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const kufi = require('kufi')
const talkedRecently = new Set();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('image')
            .setDescription('El bot buscara una imagen que vos le pidas.')
            .addStringOption(option =>
                option.setName('text')
                    .setDescription('La imagen que quieres buscar')
                    .setRequired(true)),
            async run(client, interaction){
                try{
                    if (talkedRecently.has(interaction.user.id)) {
                        interaction.reply({ content: `${interaction.user} Tienes que esperar 5 segundos para volver a usar el comando`})
                } else {
                    const string = interaction.options.getString('text')

                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setImage(kufi.image.random(string))

                    interaction.reply({ embeds: [embed]})
                    
                    talkedRecently.add(interaction.user.id);
                    setTimeout(() => {
                      // Removes the user from the set after a minute
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
