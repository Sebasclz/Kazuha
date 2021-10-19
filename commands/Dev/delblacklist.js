const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const blacklist = require('../../models/blacklist.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delblacklist')
        .setDescription('Quita a un usuario a la blacklist.')
            .addStringOption(option => 
                option.setName('id')
                .setDescription("Ingresa la ID del usuario a quitar.")
                .setRequired(true)),
                async run(client, interaction){
                    const embedErrorOwner = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')
                    if(interaction.user.id !== '419574607020949505') return interaction.reply({ embeds: [embedErrorOwner]})

                    const Id = interaction.options.getString('id')

                    const findBlacklist = await blacklist.findOne({ userId: Id})

                    if(findBlacklist){

                        await blacklist.deleteOne({
                            userId: Id
                        });

                        const embed = new MessageEmbed()
                        .setColor(config.defaultSuccessColor)
                        .setTitle('Borrado de la blacklist')
                        .setDescription('El usuario proporcionado ha sido borrado a la blacklist.')
    
                       return interaction.reply({ embeds: [embed]})

                    } else {
                    const embedError = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('El usuario no esta en la blacklist.')

                    return interaction.reply({ embeds: [embedError]})
                    }
                }
            }