const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const talkedRecently = new Set();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Preguntale al bot.')
            .addStringOption(option => 
                option.setName('text')
                .setDescription("Ingresa una pregunta para hacerle al bot.")
                .setRequired(true)),
        async run(client, interaction){
            try{
                if (talkedRecently.has(interaction.user.id)) {
                    interaction.reply({ content: `${interaction.user} Tienes que esperar 5 segundos para volver a usar el comando`})
                    setTimeout(() => {
                        interaction.deleteReply()
                      }, 5000);
            } else {
                const string = interaction.options.getString('text') //Obtenemos lo que el usuario escriba
                
                const embedError = new MessageEmbed() //Creamos el embed de error
                .setColor(config.defaultErrorColor)
                .setTitle('Error')
                .setDescription('Lo que has escrito no es una pregunta.')
                
                if(!string.endsWith('?')) return interaction.reply({ embeds:[embedError], ephemeral: true}) //Si no finaliza con "?" devolvera un error.
                
                const embedMax = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle(`Error`)
                    .setDescription('Escribe una pregunta mas corta `(Maximo 200 caracteres)`')

                const embedMin = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle(`Error`)
                    .setDescription('Escribe una pregunta mas larga `(Minimo 10 caracteres)`')

                    //Si tiene mas de 200 caracteres o menos de 10 devolvera un error
                    if(string.length > 200)  return interaction.reply({ embeds: [embedMax], ephemeral: true})
                    if(string.length < 10)  return interaction.reply({ embeds: [embedMin], ephemeral: true})

            //----> Respuestas que dira el bot <----
            const respuestas = ['Si', 'No', 'Tal vez', 'Probablemente no', 'Probablemente si', 'Goku le gana', 'Soy dios y vos no', 'Seguramente si', 'Seguramente no', 'Puede ser que si', 'Puede ser que no',
        'A lo mejor si', 'A lo mejor no', '2 + 2 es 4 y 4 + 4 es igual a que moriras solo', 'Hola buenas', 'Eso no es una pregunta', 'Eso si es una pregunta', 'Eso es un numero', 'Eso no es un numero', 'La tengo mas larga que vos >:)', 'La tengo mas corta que vos >:(', "En mi opinion, si","Es cierto",
        "Es decididamente asi","Probablemente","Buen pronostico","Todo apunta a que si","Sin duda","Si","Si - definitivamente",
        "Debes confiar en ello","Respuesta vaga, vuelve a intentarlo","Pregunta en otro momento","Sera mejor que no te lo diga ahora",
        "No puedo predecirlo ahora","Concentrate y vuelve a preguntar","Puede ser","No cuentes con ello","Mi respuesta es no","Mis fuentes me dicen que no",
        "Las perspectivas no son buenas","Muy dudoso"]
            
    
            const randomString = respuestas[Math.floor(Math.random() * respuestas.length)] //Hacemos que el bot elija una respuesta aleatoria
    
            const embed = new MessageEmbed() //Creamos el embed
            .setColor(config.defaultSuccessColor)
            .setDescription("Tu pregunta es: `" + string + "`\n\nMi respuesta es: `" + randomString + "`")

            interaction.reply({embeds: [embed]}) //Devolvemos el embed con la respuesta

            talkedRecently.add(interaction.user.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              talkedRecently.delete(interaction.user.id);
            }, 5000);
        }
            } catch(e) { //Si da error le avisara al usuario y lo mandara al canal privado del servidor.
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
