const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const developer = require('../../models/developer.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('activity')
        .setDescription('Define la actividad del bot.')
        .addStringOption(option =>
            option.setName('activity')
                .setDescription('Escribe la nueva actividad que mostrara el bot')
                .setRequired(true)),
    async run(client, interaction) {
        try {
            await interaction.deferReply()
            const developers = await developer.findOne({ developerId: interaction.user.id })

            const embedErrorOwner = new MessageEmbed() //Diremos que retorne un embed de error cuando el autor no sea el creador del bot
            .setColor(config.defaultErrorColor)
            .setTitle('Error')
            .setDescription('Comando solo para desarrolladores')

            if(developers === null) return interaction.editReply({ embeds: [embedErrorOwner]}) 
            const newActivity = interaction.options.getString('activity');

            client.user.setActivity(newActivity)

              const embed = new MessageEmbed()
               .setColor(config.defaultSuccessColor)
               .setTitle("Actividad | Slide ")
               .setDescription(`Nueva actividad del bot:\n${activityargs}`)

              return interaction.reply({ embeds: [embed] })
            
        } catch(e){
            console.log(e)
        }
    }
}
