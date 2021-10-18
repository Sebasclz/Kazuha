const { SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reinicia el bot'),
                async run(client, interaction){
                    try{
                        const embedError = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')
                    if(interaction.user.id !== '419574607020949505') return interaction.reply({ embeds: [embedError]})

                    await interaction.reply('`>>> Reinicio en proceso <<<`').then(() => client.destroy())
                    .then(() => client.login(config.token))
                    await interaction.editReply('`>>> Reinicio completado <<<`')
                    console.log('>>> Reinicio completado <<<')
                    } catch(e){
                        console.log(e)
                    }
                }
            }