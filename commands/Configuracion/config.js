const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment, MessageButton, MessageActionRow } = require('discord.js')
const config = require('../../config.json')
const configModel = require('../../models/config.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Devuelve comandos de configuracion del bot')
        .addSubcommandGroup(subcommandgroup => 
            subcommandgroup
            .setName('channel')
            .setDescription('Configura el canal donde responde las interacciones el bot')

        //Command 1
        .addSubcommand(subcommand => 
            subcommand
            .setName('enable')
            .setDescription('Habilita que el bot responda las interacciones en un canal.')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('Menciona el canal')
                    .setRequired(true)))

        //Command 2          
        .addSubcommand(subcommand => 
            subcommand
            .setName('disable')
            .setDescription('Deshabilita el canal donde el bot no responde las interacciones.')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('Menciona el canal')
                    .setRequired(true)))),
        async run(client, interaction){
            if(interaction.options.getSubcommand() === "enable"){
                /*
                ENABLE
                */
               //Si no tiene permisos de administrador le negamos el comando
                if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Necesitas permisos de `Administrador` para ejecutar este comando')
                ]})
                const channelName = interaction.options.getChannel('channel') //Agarramos el canal que menciono el usuario

                //Si menciono una categoria o canal de voz retornamos un error
                if (channelName.type === 'GUILD_CATEGORY' || channelName.type === 'GUILD_VOICE'){ 
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('No puedes ejecutar este comando en categorias o canales de voz.')
                    ]})
                }

                const channelId = channelName.id //Sacamos la ID del canal

                const channelEnable = await configModel.findOne({ guildChannelId: channelId}) //Buscamos la ID del canal en la base de datos

                if(!channelEnable){ //Si no hay ID en la base de datos creamos una nueva
                    const newChannel = new configModel({
                        guildChannelId: channelId,
                        guildId: interaction.guild.id
                    });
                    await newChannel.save().catch(e => console.log(e)); //Lo guardamos

                    const embed = new MessageEmbed() //Mandamos un embed de confirmacion
                        .setColor(config.defaultSuccessColor)
                        .setTitle('Canal agregado')
                        .setDescription('Ya no respondere las interacciones del canal mencionado.')
    
                       return interaction.reply({ embeds: [embed]})

                } else { //Si el bot ya no responde interacciones de ese canal enviamos un error
                    const embedError = new MessageEmbed() //Creamos el embed de error
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Ya fue configurado el canal para que no responda las interacciones.')

                    return interaction.reply({ embeds: [embedError]})
                }

            } else if(interaction.options.getSubcommand() === "disable"){
                /*
                DISABLE
                */
               //Si no tiene permisos de administrador le negamos el comando
                if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Necesitas permisos de `Administrador` para ejecutar este comando')
                ]})
                const channelName = interaction.options.getChannel('channel') //Agarramos el canal que menciono el usuario

                //Si menciono una categoria o canal de voz retornamos un error
                if (channelName.type === 'GUILD_CATEGORY' || channelName.type === 'GUILD_VOICE'){ 
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('No puedes ejecutar este comando en categorias o canales de voz.')
                    ]})
                }

                const channelId = channelName.id //Sacamos la ID del canal

                const channelEnable = await configModel.findOne({ guildChannelId: channelId}) //Buscamos la ID del canal en la base de datos

                if(channelEnable){ //Si existe la base de datos eliminamos la que tenga la ID igual
                    await configModel.deleteOne({
                        guildChannelId: channelId
                    }); //Lo eliminamos

                    const embed = new MessageEmbed() //Mandamos un embed de confirmacion
                        .setColor(config.defaultSuccessColor)
                        .setTitle('Canal eliminado')
                        .setDescription('Volvere a responder las interacciones del canal mencionado.')
    
                       return interaction.reply({ embeds: [embed]})

                } else { //Si el bot ya no responde interacciones de ese canal enviamos un error
                    const embedError = new MessageEmbed() //Creamos el embed de error
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Este canal no esta en la lista de canales que no respondo')

                    return interaction.reply({ embeds: [embedError]})
                }
            }
        }
    }