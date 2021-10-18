const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bean')
        .setDescription('Benea a alguien.')
            .addUserOption(option => 
                option.setName('user')
                .setDescription("Ingresa una persona para benear.")
                .setRequired(true)),
        async run(client, interaction){
            try{
                    const user = interaction.options.getUser('user') //Recogemos el usuario al que menciono
                    
                    const embedErrorBot = new MessageEmbed() //Creamos el mensaje de Error por si menciona a un bot
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No puedes mencionar a un bot.')
                    
                    if(user.bot) return interaction.reply({ embeds: [embedErrorBot]}) //Retorna el embed cuando menciona a un bot
                    
                    const embedErrorUser = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No te puedes mencionar a vos mismo')
        
                    if(user === interaction.user) return interaction.reply({ embeds: [embedErrorUser]}) //Retorna el embed por si se menciona a si mismo

                    const embedErrorNoPermsUser = new MessageEmbed() //Creamos el mensaje de Error por si no tiene "permisos" para banear personas
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No tienes permisos suficientes para ejecutar este comando')
                    
                    if(!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ embeds: [embedErrorNoPermsUser]})

                    const embedErrorNoPermsBot = new MessageEmbed() //Creamos el mensaje de error por si el bot no tiene "permisos"
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No tengo permisos suficientes. Por favor asigname el permiso de `BAN_MEMBERS` o `ADMINISTRATOR`')
                    
                    if(!interaction.guild.me.permissions.has('BAN_MEMBERS')) return interaction.reply({ embeds: [embedErrorNoPermsBot]})
                    


                    const embed = new MessageEmbed() //Creamos el embed si todo sale bien
                    .setColor('GREEN')
                    .setDescription(`${interaction.user} ha baneado a ${user} de este servidor`)
                    .setFooter('FakeBan', interaction.user.displayAvatarURL())
                    .setTimestamp()
                    
                    return interaction.reply({embeds: [embed]}) //Enviamos el embed

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