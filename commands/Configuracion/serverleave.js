const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('svleave')
        .setDescription('Haz que el bot salga de un servidor.')
            .addStringOption(option => 
                option.setName('text')
                .setDescription("Ingresa la ID del servidor o el nombre en minusculas.")
                .setRequired(true)),
                async run(client, interaction){
                    const server = interaction.options.getString('text')

                    const embedErrorOwner = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')
                    if(interaction.user.id !== '419574607020949505') return interaction.reply({ embeds: [embedErrorOwner]})

                    let serverReal = client.guilds.cache.find(s => s.name.toLowerCase() === server.toLowerCase() || s.id === server);
                    
                    const embedErrorNoServer = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No encontre el servidor')
                    
                    if(!serverReal) return interaction.reply({ embeds: [embedErrorNoServer]})

                    await serverReal.leave()
                    
                    interaction.reply('Me he salido del servidor correctamente!')
                    

                }
            }