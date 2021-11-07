const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('commands')
                .setDescription('Ve todos los comandos del bot de forma ordenada.'),
    async run(client, interaction){
        try{
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('commands')
                    .setPlaceholder('Comandos')
                    .addOptions([{
                            label: 'Configuracion',
                            description: 'Comandos para configurar el bot.',
                            value: 'configuracion',
                            emoji: '🔧'
                        },
                        {
                            label: 'Diversion',
                            description: 'Comandos para divertirte y reirte un rato.',
                            value: 'diversion',
                            emoji: '😸'
                        },
                        {
                            label: 'Imagenes',
                            description: 'Comandos para ponerle un filtro a tu avatar.',
                            value: 'images',
                            emoji: '💎'
                        },
                        {
                            label: 'Informacion',
                            description: 'Comandos para saber la informacion de algo.',
                            value: 'informacion',
                            emoji: 'ℹ️'
                        },
                        {
                            label: 'Interacciones',
                            description: 'Comandos de interaccion con los cuales puedes expresarte.',
                            value: 'interaccion',
                            emoji: '😎'
                        },
                        {
                            label: 'Utilidad',
                            description: 'Comandos que te pueden ser utiles alguna vez en la vida.',
                            value: 'utilidad',
                            emoji: '🛠️'
                        },
                        {
                            label: 'Videojuegos',
                            description: 'Comandos para saber informacion sobre un juego',
                            value: 'games',
                            emoji: '🎮'
                        }
                    ])
                )

            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle('Comandos')
                .setDescription('En cada categoria del menu de abajo encontraras todos mis comandos.\n\nEsto esta hecho asi para que sea de una forma mas ordenada y no tan intrusiva en el chat.')
                .setImage('https://i.ibb.co/gT0ds1Y/banner-bot.gif')
                .setFooter('Si no ves el menú, por favor actualiza Discord.', interaction.user.displayAvatarURL({ dynamic: true }))

            await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
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