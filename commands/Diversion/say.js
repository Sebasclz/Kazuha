const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Util } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('say')
                .setDescription('El bot repetira lo que vos le digas.')
                .addStringOption(option =>
                    option.setName('text')
                    .setDescription('El texto a repetir')
                    .setRequired(true))
                .addChannelOption(option =>
                    option.setName('channel')
                    .setDescription('El canal al que lo quieras enviar')),
        async run(client, interaction){
            try{
                    //Declaramos la constante para que recoga el string que introdujo el usuario
                    let string = interaction.options.getString('text');

                    const channelName = interaction.options.getChannel('channel')

                    const channelInteraction = interaction.channel


                    if(!channelName){
                        if(!interaction.guild.me.permissionsIn(channelInteraction).has("SEND_MESSAGES")){
                            return interaction.reply({ 
                                embeds: [
                                new MessageEmbed()
                                .setColor(config.defaultErrorColor)
                                .setTitle('Error')
                                .setDescription('Necesito el permiso de poder enviar mensajes en este canal `SEND_MESSAGES`')
                                ],
                                ephemeral: true
                            })
                        }

                        for(let i = 0; string.includes("@here") || string.includes("@everyone"); i++){
                            string = string.replace(/@here/g, "here")
                            string = string.replace(/@everyone/g, "everyone")
                        }
                        
                        //Si es everyone o here le quitara el @ y luego regresa lo que puso el usuario
                        interaction.channel.send(Util.cleanContent(string, interaction))
                        return interaction.reply({ content: 'El mensaje ha sido enviado correctamente, puedes borrar este mensaje', ephemeral: true})
                    } else if(channelName){                    
                    const channelId = channelName.id

                    if(!interaction.guild.me.permissionsIn(channelName).has("VIEW_CHANNEL")){
                        return interaction.reply({
                            embeds: [
                            new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle('Error')
                            .setDescription('No tengo acceso al canal mencionado `VIEW_CHANNEL`')
                            ],
                            ephemeral: true
                        })
                    }

                    if(!interaction.guild.me.permissionsIn(channelName).has("SEND_MESSAGES")){
                        return interaction.reply({ 
                            embeds: [
                            new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle('Error')
                            .setDescription('Necesito el permiso de poder enviar mensajes en el canal mencionado `SEND_MESSAGES`')
                            ],
                            ephemeral: true
                        })
                    }

                    if (channelName.type !== 'GUILD_TEXT'){ 
                        return interaction.reply({ embeds: [
                            new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle('Error')
                            .setDescription('No puedes ejecutar este comando en canales que no sean de texto')
                        ]})
                    }

                    for(let i = 0; string.includes("@here") || string.includes("@everyone"); i++){
                        string = string.replace(/@here/g, "here")
                        string = string.replace(/@everyone/g, "everyone")
                    }
                    
                    client.channels.cache.get(`${channelId}`).send(Util.cleanContent(string, interaction))
                    return interaction.reply({ content: 'El mensaje ha sido enviado correctamente al canal indicado, puedes borrar este mensaje', ephemeral: true})
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
 