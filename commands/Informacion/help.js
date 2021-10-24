const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton, version } = require('discord.js')
const config = require('../../config.json')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('help')
                .setDescription('Comando de ayuda. Sirve mucho para empezar a comprender el bot.'),
    async run(client, interaction){
        try{

            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle('Comando de ayuda | Kazuha')
                .setDescription(`Soy **Kazuha**, un bot multifuncional. Tengo comandos de videojuegos, interacciones, diversion, y mas!

• __Comandos:__
Para ver mis comandos solo tendras que escribir \`/commands\`

• __Invitarme a tu servidor:__
Si quieres invitarme a tu servidor solo haz [click aqui](https://discord.com/oauth2/authorize?client_id=898933117123973211&permissions=8&scope=bot%20applications.commands)

• __Servidor de soporte:__
Entra a mi servidor de soporte dando [click aqui](https://discord.gg/V8CpAUhkSk)

• __Bot desarrollado por:__
[iSebas#3534](https://twitter.com/_SebasTD)`)
                .setImage('https://i.ibb.co/gT0ds1Y/banner-bot.gif')
                .setFooter('Comando de ayuda', client.user.displayAvatarURL())
                .setTimestamp()

            interaction.reply({ embeds: [embed] })
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