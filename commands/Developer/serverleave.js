const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const developer = require('../../models/developer.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Comando solo para desarrolladores')
        .addSubcommand(subcommand => 
            subcommand
            .setName('leave')
            .setDescription('Haz que el bot salga de un servidor')
                .addStringOption(option => 
                    option.setName('id')
                    .setDescription("ID del servidor")
                    .setRequired(true))),
                async run(client, interaction){
                    await interaction.deferReply()
                    const developers = await developer.findOne({ developerId: interaction.user.id })

                    const embedErrorOwner = new MessageEmbed() //Diremos que retorne un embed de error cuando el autor no sea el creador del bot
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')

                    if(developers === null) return interaction.editReply({ embeds: [embedErrorOwner]}) 
                    
                    const id = interaction.options.getString('text')

                    const guild = client.guilds.cache.get(`${id}`)

                    if(!guild){
                        return interaction.editReply({ embeds: [
                            new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle('Error')
                            .setDescription('No encontre el servidor')
                        ]})
                    }
                        await guild.leave()
                        
                        interaction.editReply('Me he salido del servidor correctamente!')
                        
                    }
                }