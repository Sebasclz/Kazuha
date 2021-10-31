const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const blacklist = require('../../models/blacklist.js') 
const developer = require('../../models/developer.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('addblacklist') 
        .setDescription('Comando solo para desarrolladores.') 
            .addStringOption(option => 
                option.setName('id') 
                .setDescription("Ingresa la ID del usuario a agregar.") 
                .setRequired(true)), 
                async run(client, interaction){
                    await interaction.deferReply()
                    const developers = await developer.findOne({ developerId: interaction.user.id })

                    const embedErrorOwner = new MessageEmbed() //Diremos que retorne un embed de error cuando el autor no sea el creador del bot
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')

                    if(developers === null) return interaction.editReply({ embeds: [embedErrorOwner]}) 

                    const Id = interaction.options.getString('id') //El bot recogera la ID que pusimos

                    const findBlacklist = await blacklist.findOne({ userId: Id}) //Buscamos la ID en la base de datos

                    if(!findBlacklist){ //Si no encuentra la ID

                        const addUserBlacklist = new blacklist({ //Creamos una nueva blacklist
                            userId: Id 
                        });
                        await addUserBlacklist.save().catch(e => console.log(e));

                        const embed = new MessageEmbed() //Mandamos un embed de confirmacion
                        .setColor(config.defaultSuccessColor)
                        .setTitle('Agregado a la blacklist')
                        .setDescription('El usuario proporcionado ha sido agregado a la blacklist.')
    
                       return interaction.editReply({ embeds: [embed]})

                    } else {
                    const embedError = new MessageEmbed() //Si ya esta en la blacklist mandamos un embed de error diciendo que ya esta
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('El usuario ya esta en la blacklist.')

                    return interaction.editReply({ embeds: [embedError]})
                    }
                    }
                }
 