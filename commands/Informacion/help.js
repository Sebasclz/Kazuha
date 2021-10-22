const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton, version } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('help')
                .setDescription('Comando de ayuda. Sirve mucho para empezar a comprender el bot.'),
    async run(client, interaction){
        try{

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Invitame')
                .setStyle('LINK')
                .setURL('https://discord.com/oauth2/authorize?client_id=898933117123973211&permissions=8&scope=bot%20applications.commands')
                .setEmoji('🎉'),

                new MessageButton()
                .setLabel('Soporte')
                .setStyle('LINK')
                .setURL('https://discord.gg/V8CpAUhkSk')
                .setEmoji('🔧'),

                
                new MessageButton()
                .setLabel('Votar por el bot (DiscordThings)')
                .setStyle('LINK')
                .setURL('https://discordthings.com/bot/898933117123973211/vote')
                .setEmoji('💎'),

                new MessageButton()
                .setLabel('Documentacion (Mantenimiento)')
                .setStyle('LINK')
                .setURL('https://sebas-1.gitbook.io/kazuha/')
                .setEmoji('📖')
                .setDisabled()
            )

            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle('Comando de ayuda | Slide')
                .setDescription('Soy **Kazuha**, un bot multifuncional que sirve para todo lo que te puedas imaginar.\n\n**__Comandos__**\nPara ver mis comandos solo tendras que escribir `/commands`.')
                .addField(`📚 Libreria`, `Discord.js v${version}`, true)
                .addField(`📣 Versión`, `1.0.0`, true)
                .addField('\u200b', '\u200b', true)
                .addField(`💎 Fecha de creación`, `25-Ago-2021`, true)
                .addField(`🔧 Desarrollado por`, `iSebas#3534`, true)
                .setImage('https://i.ibb.co/gT0ds1Y/banner-bot.gif')
                .setFooter('Comando de ayuda', client.user.displayAvatarURL())
                .setTimestamp()

            interaction.reply({ embeds: [embed], components: [row] })
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