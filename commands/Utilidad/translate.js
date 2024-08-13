const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const talkedRecently = new Set();
const translate = require('@iamtraction/google-translate')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('translate')
            .setDescription('Traduce un texto al español')
            .addStringOption(option =>
                option.setName('text')
                    .setDescription('Introduce el texto a traducir')
                    .setRequired(true)),
            async run(client, interaction){
                try{
                    if (talkedRecently.has(interaction.user.id)) {
                        interaction.reply({ content: `${interaction.user} Tienes que esperar 5 segundos para volver a usar el comando`})
                        setTimeout(() => {
                            interaction.deleteReply()
                          }, 5000);               
                    } else {
                    
                const query = interaction.options.getString('text')

                const embedError = new MessageEmbed()
                .setTitle('Error')
                .setDescription('No puedes traducir un texto del español al español')
                .setColor(config.defaultErrorColor)
                
                const translated = await translate(query, { to: "es" })

                if(translated.from.language.iso === 'es') return interaction.reply({ embeds: [embedError]})
                
                const embed = new MessageEmbed()
                .setTitle('Traductor | Kazuha')
                .setDescription('📥 Entrada\n```js\n' + query + '```\n📤 Salida\n```js\n' + translated.text + '```')
                .setColor(config.defaultSuccessColor)
                .setThumbnail(`https://play-lh.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA`)
                .setFooter(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
                .setTimestamp()

                 interaction.reply({ embeds: [embed]})
                
                    
                    talkedRecently.add(interaction.user.id);
                    setTimeout(() => {
                      talkedRecently.delete(interaction.user.id);
                    }, 5000);
                }
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
