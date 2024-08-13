const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('support')
                .setDescription('Genera un link para entrar al servidor de soporte.'),
    async run(client, interaction){
        try{

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Servidor de soporte')
                .setStyle('LINK')
                .setURL('https://discord.gg/V8CpAUhkSk')
                .setEmoji('🔧')
            )

            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle('Comando de soporte | Kazuha')
                .setDescription(`Si tienes alguna sugerencia, error que reportar o simplemente te quieres unir al servidor, entonces haz click aqui al boton de abajo.`)                
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