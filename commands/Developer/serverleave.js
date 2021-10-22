const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const developer = require('../../models/developer.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('svleave')
        .setDescription('Haz que el bot salga de un servidor.')
            .addStringOption(option => 
                option.setName('text')
                .setDescription("Ingresa la ID del servidor o el nombre en minusculas.")
                .setRequired(true)),
                async run(client, interaction){
                    return interaction.reply({ content: 'El comando esta en mantenimiento'})
                    await interaction.deferReply({ ephemeral: true})
                    const developers = await developer.findOne({ developerId: interaction.user.id })

                    const embedErrorOwner = new MessageEmbed() //Diremos que retorne un embed de error cuando el autor no sea el creador del bot
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')

                    if(developers === null) return interaction.editReply({ embeds: [embedErrorOwner]}) 
                    
                /*const id = interaction.options.getString('text')

                    const promises= [
                        client.shard.fetchClientValues(`guilds.cache`),
                    ]
                    
                    Promise.all(promises).then(async results => {
                        const guilds = results[0]


                        return console.log(await guilds)

                        
                        const embedErrorNoServer = new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('No encontre el servidor')
                        
                        if(!serverReal) return interaction.editReply({ embeds: [embedErrorNoServer]})
    
                        await serverReal.leave()
                        
                        interaction.editReply('Me he salido del servidor correctamente!')
                        
                    }) */

                }
            }