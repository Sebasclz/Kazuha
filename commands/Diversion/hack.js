const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const wait = require('util').promisify(setTimeout);
const chance = require('chance').Chance()
const talkedRecently = new Set();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hack')
        .setDescription('Hackea a alguien.')
            .addUserOption(option => 
                option.setName('user')
                .setDescription("Ingresa una persona para hackear")
                .setRequired(true)),
        async run(client, interaction){
            try{
                if (talkedRecently.has(interaction.user.id)) {
                    interaction.reply({ content: `${interaction.user} Tienes que esperar 10 segundos para volver a usar el comando`})
                    setTimeout(() => {
                        interaction.deleteReply()
                      }, 10000);  
            } else {
        //Recogemos el usuario que se menciono
        const user = interaction.options.getUser('user')
       
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


        const dominios = ['outlook.com', 'gmail.com', 'hotmail.com', 'yahoo.com']

        const random = dominios[Math.floor(Math.random() * dominios.length)]

        const ip = chance.ip()
        const numero = chance.phone({ country: 'us', mobile: true})
        const correo = chance.email({ domain: random })

        const contraseña = chance.word({ length: 12 })
        

        //Creamos el embed con las opciones elegidas aleatoriamente
        const embed = new MessageEmbed()
        .setColor(config.defaultSuccessColor)
        .setDescription(`Hackeo completado a ${user}.`)
        .addField(`Correo electronico:`, "```" + correo +  "```", true)
        .addField(`Contraseña:`, "```" + contraseña +  "```", true)
        .addField(`Telefono:`, "```" + numero + "```", true)
        .addField(`Direccion IP:`, "```" + ip + "```", true)
        
        talkedRecently.add(interaction.user.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              talkedRecently.delete(interaction.user.id);
            }, 10000);

        await interaction.deferReply()
        await wait(1600)
        await interaction.editReply(`Empezando el hackeo...`) //Mandamos cada mensaje cada 1,6 segundos
        await wait(1600)
        await interaction.editReply(`Correo electronico obtenido...`)
        await wait(1600)
        await interaction.editReply(`Contraseña obtenida...`)
        await wait(1600)
        await interaction.editReply(`Telefono obtenido...`)
        await wait(1600)
        await interaction.editReply(`Direccion IP obtenida...`)
        await wait(1600)
        await interaction.editReply(`Hackeo completado.`)
        await wait(1000)
        await interaction.editReply({ content: ' ', embeds: [embed]}) //Mandamos el embed final con todo "hackeado"

        }

            } catch(e){ //Si encuentra un error lo reportara al canal privado y le avisara al usuario
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