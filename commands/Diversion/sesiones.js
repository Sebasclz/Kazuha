const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sesiones')
        .setDescription('Crea una sesion de una aplicacion dentro de Discord'),
    async run(client, interaction){
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
                .setCustomId('sesiones')
                .setPlaceholder('Aplicacion')
                .addOptions([
                {
                    label: 'Youtube',
                    description: 'Inicia una sesion de YouTube Together',
                    value: 'youtube',
                    emoji: '📹'
                },
                {
                    label: 'Fishington',
                    description: 'Inicia una sesion de Fishington',
                    value: 'fishington',
                    emoji: '🎣'
                },
                {
                    label: 'Betrayal',
                    description: 'Inicia una sesion de Betrayal',
                    value: 'betrayal',
                    emoji: '🔪'
                },
                {
                    label: 'Poker',
                    description: 'Inicia una sesion de Poker',
                    value: 'poker',
                    emoji: '🎰'
                },
                {
                    label: 'Ajedrez',
                    description: 'Inicia una sesion de Ajedrez',
                    value: 'chess',
                    emoji: '♟️'
                },
                {
                    label: 'Letter Tile',
                    description: 'Inicia una sesion de Letter Tile',
                    value: 'letterTile',
                    emoji: '🆒'

                },
                {
                    label: 'Words Snack',
                    description: 'Inicia una sesion de Words Snack',
                    value: 'wordsSnack',
                    emoji: '🔠'
                },
                {
                    label: 'Doodle Crew',
                    description: 'Inicia una sesion de Doodle Crew',
                    value: 'doodleCrew',
                    emoji: '🖌️'
                },
                {
                    label: 'SpellCast',
                    description: 'Inicia una sesion de SpellCast',
                    value: 'spellCast',
                    emoji: '🧙'
                },
                {
                    label: 'Awkword',
                    description: 'Inicia una sesion de Awkword',
                    value: 'awkword',
                    emoji: '❓'
                },
                {
                    label: 'Or Checkers in the Park',
                    description: 'Inicia una sesion de Or Checkers in the Park',
                    value: 'orcheckerinthepark',
                    emoji: '🌲'
                }
            ])
        )
        const embed = new MessageEmbed()
        .setColor(config.defaultSuccessColor)
        .setTitle('Aplicaciones')
        .setDescription('Selecciona una aplicacion para empezar la fiesta!')
        .setFooter('Si no ves el menú, por favor actualiza Discord.', interaction.user.displayAvatarURL({ dynamic: true }))

        await interaction.reply({ embeds: [embed], components: [row]})
    }
}

