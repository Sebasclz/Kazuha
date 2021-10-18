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
                .setURL('https://discord.com/api/oauth2/authorize?client_id=891675957902053449&permissions=8&scope=bot%20applications.commands')
                .setEmoji('🎉'),

                new MessageButton()
                .setLabel('Soporte')
                .setStyle('LINK')
                .setURL('https://discord.gg/V8CpAUhkSk')
                .setEmoji('🔧'),

                new MessageButton()
                .setLabel('Documentacion')
                .setStyle('LINK')
                .setURL('https://sebas-1.gitbook.io/kazuha/')
                .setEmoji('📖'),

                new MessageButton()
                .setLabel('Votar por el bot (DiscordThings)')
                .setStyle('LINK')
                .setURL('https://discordthings.com/bot/898933117123973211/vote')
                .setEmoji('💎')
            )

            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setAuthor('👑 Creador del bot: S3BAS#3534')
                .setTitle('Comando de ayuda | Kazuha')
                .setDescription('Soy **Kazuha**, un bot multifuncional que sirve para todo lo que te puedas imaginar.\n\n**__Comandos__**\nPara ver mis comandos solo tendras que escribir `/commands`.')
                .addField(`📚 Libreria`, `Discord.js v${version}`, true)
                .addField(`📣 Versión`, `1.0.0`, true)
                .addField(`💎 Fecha de creación`, `25-Ago-2021`, true)
                .setImage('https://i.ibb.co/zGn2cKK/Untitled-Design.png')
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