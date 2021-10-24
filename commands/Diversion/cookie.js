const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const cookie = require('../../models/commands.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cookie')
        .setDescription('Dale una galleta a alguien.')
            .addUserOption(option => 
                option.setName('user')
                .setDescription("Ingresa una persona para darle una galleta.")
                .setRequired(true)),
                async run(client, interaction){
            try{
                let user = interaction.options.getUser('user') //Recogera el usuario que hemos puesto
                const userId = user.id //Recogera la id del usuario mencionado
                
                //Si el usuario se menciona a si mismo regresara un mensaje de error
                if(user === interaction.user) return interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('No te puedes dar galletas a vos mismo')
                    .setColor(config.defaultErrorColor)
                ]})

                    if(user.bot && user != client.user) return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('No puedes darle una galleta a un bot. Solo a mi me puedes dar una galleta :eyes:')
                    ]}) //Si menciona a un bot que no sea Kazuha dara error XD

                    const cookieFindUser = await cookie.findOne({ userId: interaction.user.id}) //Buscara al usuario que interacciono en la DB
                    
                    
                    const cookieFindMention = await cookie.findOne({ userId: userId}) //Buscara al usuario mencionado en la DB
                    
                    if(!cookieFindUser && !cookieFindMention){ //Si no encuentra a los dos usuarios en la DB lo crea
                        const newCookieUser = new cookie({
                            userId: interaction.user.id.toString(),
                            cookieReceived: 0,
                            cookieGiven: 0,
                        })
                        await newCookieUser.save().catch(e => console.log(e))
                        
                        const newCookieMention = new cookie({
                            userId: userId.toString(),
                            cookieReceived: 0,
                            cookieGiven: 0,
                        })
                        await newCookieMention.save().catch(e => console.log(e))
                        return interaction.reply('Datos guardados en mi base de datos. Vuelve a ejecutar el comando.')
                    }
                    if(!cookieFindMention){ //Si no encuentra al usuario mencionado en la DB lo crea
                        const newCookieMention = new cookie({
                            userId: userId.toString(),
                            cookieReceived: 0,
                            cookieGiven: 0,
                        })
                        await newCookieMention.save().catch(e => console.log(e))
                        return interaction.reply('Datos guardados del usuario mencionado en mi base de datos. Vuelve a ejecutar el comando.')
                    }

                    if(!cookieFindUser){ //Si no encuentra al usuario que interacciono en la DB lo crea
                        const newCookieUser = new cookie({
                            userId: interaction.user.id.toString(),
                            cookieReceived: 0,
                            cookieGiven: 0,
                        })
                        await newCookieUser.save().catch(e => console.log(e))
                        return interaction.reply('Datos guardados del usuario que interacciono en mi base de datos. Vuelve a ejecutar el comando.')
                    }
                        
                    
                    //Obtenemos las galletas que tiene el que interacciono y las que recibio y las que recibio la persona mencionada
                    const cookieGiven = cookieFindUser.cookieGiven
                    const cookieReceived = cookieFindUser.cookieReceived
                    const cookieReceivedUser = cookieFindMention.cookieReceived

                    //Sumamos las galletas del que interacciono y del mencionado
                    /*
                    Recibidas + Usuario que menciono
                    Dadas + Usuario que interacciono
                    */
                    const newCookieGiven = parseInt(cookieGiven) + parseInt(1)
                    const newCookieReceivedUser = parseInt(cookieReceivedUser) + parseInt(1)

                    //Buscamos la DB del que interacciono y la actualizamos con galletas dadas
                    await cookie.findOne({
                        userId: interaction.user.id,
                    }).updateOne({
                        cookieGiven: newCookieGiven,
                    })

                    //Buscamos la DB del usuario mencionado y la actualizamos con galletas recibidas
                    await cookie.findOne({
                        userId: userId,
                    }).updateOne({
                        cookieReceived: newCookieReceivedUser,
                    })

                    //Enviamos la confirmacion de que ha dado la galleta, cuantas recibio y cuantas dio
                    const embed = new MessageEmbed()
                    .setDescription(`${interaction.user} le ha dado una galleta :cookie: a ${user}`)
                    .addField(`Cantidad de galletas que regalaste`, '`' + `${newCookieGiven}` + '`', true)
                    .addField(`Cantidad de galletas que te regalaron`, '`' + `${cookieReceived}` + '`', true)
                    .setColor(config.defaultSuccessColor)

                    return interaction.reply({ embeds: [embed]}) //Enviamos finalmente el puto mensaje y se termina el comando
            } catch(e){ //Si da error le avisara al usuario y lo mandara al canal privado del servidor.
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