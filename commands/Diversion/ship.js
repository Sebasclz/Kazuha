const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const { soyultro } = require('soyultro')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('ship')
                .setDescription('Calcula el amor entre vos y otra persona')
                .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona a la otra persona para calcular.')
                .setRequired(true)),
    async run(client, interaction){
        try{
            const user = interaction.options.getUser('user') //Recogemos el usuario que menciono

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

            const random = Math.floor(Math.random() * 100) //Elegimos un numero aleatorio entre 1 y 100

            //Imagenes de interaccion
            const love = soyultro('love')
            const cringe = soyultro('cringe')
            const thumbsup = soyultro('thumbsup')

            if(random <= 50){ //Embed con menor o igual a 50
            const embed50 = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`El porcentaje de amor entre ${interaction.user} y ${user} es de: ${random}%`)
            .setImage(cringe)

            return interaction.reply({ embeds: [embed50]})  //Enviamos el embed con el resultado

            } else if(random <= 75){
            
            const embed75 = new MessageEmbed() //Embed con menor o igual a 75 y mayor a 50
            .setColor(config.defaultSuccessColor)
            .setDescription(`El porcentaje de amor entre ${interaction.user} y ${user} es de: ${random}%`)
            .setImage(thumbsup)

            return interaction.reply({ embeds: [embed75]})  //Enviamos el embed con el resultado

            } else if(random <= 100){ //Embed con menor o igual a 100 o mayor a 75
                const embed100 = new MessageEmbed() //Embed con menor o igual a 75 y mayor a 50
                .setColor(config.defaultSuccessColor)
                .setDescription(`El porcentaje de amor entre ${interaction.user} y ${user} es de: ${random}%`)
                .setImage(love)
    
                return interaction.reply({ embeds: [embed100]})  //Enviamos el embed con el resultado
            }
        } catch(e){ //Si da algun error lo reportara al servidor y se le avisara al usuario
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