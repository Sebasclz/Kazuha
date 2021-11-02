const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('invite')
                .setDescription('Genera un link de para que me invites a un servidor.'),
    async run(client, interaction){
        try{

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Invitame')
                .setStyle('LINK')
                .setURL('https://discord.com/oauth2/authorize?client_id=898933117123973211&permissions=8&scope=bot%20applications.commands')
                .setEmoji('🎉')
            )

            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle('Comando para invitarme | Kazuha')
                .setDescription(`Soy un bot multifuncional. ¡Tengo comandos tanto de videojuegos, utilidad, aplicaciones, interaccion, diversión y mucho más!`)                
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