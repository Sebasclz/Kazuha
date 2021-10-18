const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const kufi = require('kufi')

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
                    const string = interaction.options.getString('text')

                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setImage(kufi.image.random(string))

                    return interaction.reply({ embeds: [embed]}).catch(() => {
                        const embedError = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No se ha encontrado una imagen o ha ocurrido un error.')
                    
                    interaction.reply({ embeds: [embedError]})
                    });
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
