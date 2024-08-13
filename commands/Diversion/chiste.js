const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const talkedRecently = new Set();
const fetch = require('node-fetch')
const translate = require('@iamtraction/google-translate')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('chiste')
                .setDescription('Te dire chistes malos.'),
        async run(client, interaction){
            try{
                if (talkedRecently.has(interaction.user.id)) {
                    interaction.reply({ content: `${interaction.user} Tienes que esperar 3 segundos para volver a usar el comando`})
                    setTimeout(() => {
                        interaction.deleteReply()
                      }, 3000);  
            } else {

                const res = await fetch(`https://icanhazdadjoke.com/slack`)

                const json = await res.json()

                const chiste = json.attachments[0].text

                const translated = await translate(chiste, { to: "es" })

                const embed = new MessageEmbed()
                .setTitle('Chistes | Kazuha ')
                .setDescription(`${translated.text}`)
                .setColor(config.defaultSuccessColor)
                .setFooter(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
                .setTimestamp()

                interaction.reply({ embeds: [embed]})


                talkedRecently.add(interaction.user.id);
                    setTimeout(() => {
                      // Removes the user from the set after a minute
                      talkedRecently.delete(interaction.user.id);
                    }, 3000);

            }
            } catch (e){ //Si da error le avisamos al usuario y lo reportamos al servidor
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
 