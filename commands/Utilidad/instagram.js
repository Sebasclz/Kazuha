const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('instagram')
            .setDescription('El bot buscara una imagen que vos le pidas.')
            .addStringOption(option =>
                option.setName('text')
                    .setDescription('La imagen que quieres buscar')
                    .setRequired(true)),
            async run(client, interaction){
                try{
                    const name = interaction.options.getString("text")
                    const url = `https://instagram.com/${name}/?__a=1`;
        
                    let res
            
                    try {
                        res = await fetch(url).then(url => url.json())
                    

                        const account = res.graphql.user

                        const embed = new MessageEmbed()
                            .setColor(config.defaultSuccessColor)
                            .setTitle(`Cuenta de ${account.full_name}`)
                            .setURL(`https://instagram.com/${name}`)
                            .setThumbnail(account.profile_pic_url_hd)
                            .addField('Nombre de usuario', `${account.username}`)
                            .addField('Nombre', `${account.full_name}`)
                            .addField('Biografia', `${account.biography.length == 0 ? "No tiene" : account.biography}`)
                            .addField('Posts', `${account.edge_owner_to_timeline_media.count}`)
                            .addField('Seguidores', `${account.edge_followed_by.count}`)
                            .addField('Siguiendo', `${account.edge_follow.count}`)
                            .addField('Cuenta privada', `${account.is_private === true ? "Si" : "No"}`)
                            .addField('Cuenta verificada', `${account.is_verified === true ? "Si" : "No"}`)
    
                        return interaction.reply({ embeds: [embed]})
                } catch {
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('No he podido encontrar dicha cuenta, por favor vuelva a intentar.')
                        .setTimestamp()
                        .setFooter(interaction.user.username, interaction.user.avatarURL())
                    ]})
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
