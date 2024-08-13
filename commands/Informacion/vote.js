const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('vote')
                .setDescription('Genera 3 links para votar por el bot.'),
    async run(client, interaction){
        try{

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Votar - DiscordThings')
                .setStyle('LINK')
                .setURL('https://discordthings.com/bot/898933117123973211/vote')
                .setEmoji('💎')
                .setDisabled(),
                
                new MessageButton()
                .setLabel('Votar - Top.gg')
                .setStyle('LINK')
                .setURL('https://top.gg/bot/898933117123973211')
                .setEmoji('💎'),

                new MessageButton()
                .setLabel('Votar - MyBot')
                .setStyle('LINK')
                .setURL('https://portalmybot.com/list/bot/898933117123973211/vote')
                .setEmoji('💎')
            )

            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle('Comando para votar | Kazuha')
                .setDescription(`Si quieres ayudar a crecer al bot, entonces puedes votar por mi. ¡Para votar presiona en algun boton!`)                
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
            
            return interaction.reply({ embeds: [embed], components: [row] })
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