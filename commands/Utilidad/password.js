const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const kufi = require('kufi')

module.exports = {
    data: new SlashCommandBuilder()
   .setName('password')
            .setDescription('Genera una contraseña nueva de 6 a 20 caracteres. (Totalmente aleatorio)')
            .addNumberOption(option => option.setName('number')
            .setDescription('Ingresa un numero.')
            .setRequired(true)),
            async run(client, interaction){
                try{
                    const numberInteraction = interaction.options.getNumber('number')
                    const code = kufi.randomCode(numberInteraction)
            
                    const embedMin = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle(`Error`)
                    .setDescription('Tiene que ser una contraseña de minimo `6 caracteres`.')
            
                    const embedMax = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle(`Error`)
                    .setDescription('Tiene que ser una contraseña de maximo `20 caracteres`.')
            
                    if(numberInteraction < 6 ) return interaction.reply({ embeds: [embedMin], ephemeral: true})
                    if(numberInteraction > 20 )  return interaction.reply({ embeds: [embedMax], ephemeral: true})
            
                    const embed = new MessageEmbed()
                    .setTitle('Contraseña generada')
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`Contraseña generada: ${code}`)

                    return interaction.reply({ embeds: [embed], ephemeral: true}).catch(() => {
                        const embedError = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No se ha podido generar la contraseña, por favor intenta nuevamente y si no te deja reportalo en el servidor de soporte.')
                    
                    interaction.reply({ embeds: [embedError]})
                    });
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
