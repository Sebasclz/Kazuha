const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cookie')
        .setDescription('Dale una galleta a alguien.')
            .addUserOption(option => 
                option.setName('user')
                .setDescription("Ingresa una persona para darle una galleta.")
                .setRequired(true)),
        async run(client, interaction){
            try{
                    const user = interaction.options.getUser('user')

                    if(user.bot && user != client.user) return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('No puedes darle una galleta a un bot. Solo a mi me puedes dar una galleta :eyes:')
                    ]})

                    if(user === interaction.user) return interaction.reply({ content: `Toma una galleta :cookie: de mi parte <3`})

                    return interaction.reply({ content: `${interaction.user} le ha dado una galleta :cookie: a ${user}`})
            } catch(e){ //Si da error le avisara al usuario y lo mandara al canal privado del servidor.
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