const { SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')
const developer = require('../../models/developer.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reinicia el bot'),
                async run(client, interaction){
                    try{
                        await interaction.deferReply()
                        const developers = await developer.findOne({ developerId: interaction.user.id })
    
                        const embedErrorOwner = new MessageEmbed() //Diremos que retorne un embed de error cuando el autor no sea el creador del bot
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('Comando solo para desarrolladores')
    
                        if(developers === null) return interaction.editReply({ embeds: [embedErrorOwner]}) 

                    await interaction.editReply('`>>> Reinicio en proceso <<<`').then(() => client.destroy())
                    .then(() => client.login(config.token))
                    await interaction.editReply('`>>> Reinicio completado <<<`')
                    console.log('>>> Reinicio completado <<<')
                    } catch(e){
                        console.log(e)
                    }
                }
            }