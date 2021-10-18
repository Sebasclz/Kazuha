const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const { soyultro } = require('soyultro')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('interact')
        .setDescription('Devuelve comandos de interacciones')
        
        //Command 1
        .addSubcommand(subcommand =>
            subcommand
            .setName('angry')
            .setDescription('Enojate con alguien')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario con el que te quieras enojar.')
                .setRequired(true)))
        
        //Command 2
        .addSubcommand(subcommand =>
            subcommand
            .setName('baka')
            .setDescription('Dile tonto a algun usuario')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que le quieras decir tonto.')
                .setRequired(true)))
        
        //Command 3
        .addSubcommand(subcommand =>
            subcommand
            .setName('bite')
            .setDescription('Muerde a algun usuario')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que le quieras morder.')
                .setRequired(true)))
        
        //Command 4
        .addSubcommand(subcommand =>
            subcommand
            .setName('blush')
            .setDescription('¿Te sonrojaste? Demuestralo con este comando.'))
        
        //Command 5
        .addSubcommand(subcommand =>
            subcommand
            .setName('bored')
            .setDescription('Si estas aburrido representalo con este comando.'))
        
        //Command 6
        .addSubcommand(subcommand =>
            subcommand
            .setName('bonk')
            .setDescription('Golpea en la cabeza a algun usuario')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras golpear en la cabeza.')
                .setRequired(true)))
        
        //Command 7
        .addSubcommand(subcommand =>
            subcommand
            .setName('bully')
            .setDescription('Hazle bullying a algun usuario')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras hacer bullying.')
                .setRequired(true)))
        
        //Command 7
        .addSubcommand(subcommand =>
            subcommand
            .setName('bye')
            .setDescription('Dile adios a todo el mundo o a un usuario especifico.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras decir adios.')))
        
        //Command 8
        .addSubcommand(subcommand =>
            subcommand
            .setName('cry')
            .setDescription('¿Te sientes triste? Demuestralo con este comando.'))
        
        //Command 9
        .addSubcommand(subcommand =>
            subcommand
            .setName('cringe')
            .setDescription('¿Te sientes con asco o quieres mirar a alguien con asco? Demuestralo con este comando.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras mirar con asco.')))
        
        //Command 10
        .addSubcommand(subcommand =>
            subcommand
            .setName('cuddle')
            .setDescription('¿Te sientes con ganas de acurrucar a alguien? Hazlo con este comando.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario con el que te quieras acurrucar.')
                .setRequired(true)))
        
        //Command 11
        .addSubcommand(subcommand =>
            subcommand
            .setName('feed')
            .setDescription('¿Tienes hambre o quieres darle de comer a alguien? Hazlo con este comando.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras dar de comer.')))
        
        //Command 12
        .addSubcommand(subcommand =>
            subcommand
            .setName('hate')
            .setDescription('Mira con odio a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras mirar con odio.')
                .setRequired(true)))
        
        //Command 13
        .addSubcommand(subcommand =>
            subcommand
            .setName('hi')
            .setDescription('Saluda a todos o alguien en especifico.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras saludar.')))

        //Command 14
        .addSubcommand(subcommand =>
            subcommand
            .setName('hug')
            .setDescription('Abraza a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras abrazar.')
                .setRequired(true)))

        //Command 15
        .addSubcommand(subcommand =>
            subcommand
            .setName('kill')
            .setDescription('Mata a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras matar.')
                .setRequired(true)))

        //Command 16
        .addSubcommand(subcommand =>
            subcommand
            .setName('kiss')
            .setDescription('Besa a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras saludar.')
                .setRequired(true)))
        
         //Command 17
         .addSubcommand(subcommand =>
            subcommand
            .setName('lick')
            .setDescription('Lame a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras lamer.')
                .setRequired(true)))

         //Command 18
         .addSubcommand(subcommand =>
            subcommand
            .setName('nope')
            .setDescription('Dile no a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras decirle que no.')
                .setRequired(true)))
        
        //Command 19
        .addSubcommand(subcommand =>
            subcommand
            .setName('pat')
            .setDescription('Acaricia a alguien en la cabeza.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras acariciar en la cabeza.')
                .setRequired(true)))

        //Command 20
        .addSubcommand(subcommand =>
            subcommand
            .setName('poke')
            .setDescription('Molesta a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras molestar.')
                .setRequired(true)))

        //Command 21
        .addSubcommand(subcommand =>
            subcommand
            .setName('sleep')
            .setDescription('Duerme vos solo o con alguien mas')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario con el que quieras dormir.')))

        //Command 22
        .addSubcommand(subcommand =>
            subcommand
            .setName('happy')
            .setDescription('Alegrate.'))

        //Command 23
        .addSubcommand(subcommand =>
            subcommand
            .setName('think')
            .setDescription('Piensa en algo o en alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario en el que quieras pensar.')))

        //Command 24
        .addSubcommand(subcommand =>
            subcommand
            .setName('yes')
            .setDescription('Dile que si a alguien.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Menciona al usuario al que quieras decirle que si.')
                .setRequired(true))),
    async run(client, interaction) {
        if (interaction.options.getSubcommand() === "angry") {
            /*
            ANGRY
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const angry = soyultro('angry') //Gif que va a recoger el bot

            const embedAngry = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} se ha enojado con ${user}`)
            .setImage(angry)

            return interaction.reply({ embeds: [embedAngry]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if (interaction.options.getSubcommand() === "baka"){
            /*
            BAKA
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const baka = soyultro('baka') //Gif que va a recoger el bot

            const embedBaka = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} le ha dicho tonto ${user}`)
            .setImage(baka)

            return interaction.reply({ embeds: [embedBaka]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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
            
        } else if(interaction.options.getSubcommand() === 'bite'){
            /*
            BITE
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const bite = soyultro('bite') //Gif que va a recoger el bot

            const embedBite = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} se ha enojado con ${user}`)
            .setImage(bite)

            return interaction.reply({ embeds: [embedBite]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'blush'){
            /*
            BLUSH
            */
           //En este caso no necesitaremos usuario o embeds de error ya que no pide usuario.
           try{
           const blush = soyultro('blush') //Gif que va a recoger el bot 

           const embedBlush = new MessageEmbed()
           .setColor(config.defaultSuccessColor)
           .setDescription(`${interaction.user} se ha sonrojado`)
           .setImage(blush)

           return interaction.reply({ embeds: [embedBlush]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'bored'){
            /*
            BORED
            */
           //En este caso no necesitaremos usuario o embeds de error ya que no pide usuario.
           try{
           const bored = soyultro('bored') //Gif que va a recoger el bot

           const embedBored = new MessageEmbed()
           .setColor(config.defaultSuccessColor)
           .setDescription(`${interaction.user} esta aburrido`)
           .setImage(bored)
           
           return interaction.reply({ embeds: [embedBored]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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
           
        } else if(interaction.options.getSubcommand() === 'bully'){
            /*
            BULLY
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const bully = soyultro('bully') //Gif que va a recoger el bot

            const embedBully = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} le hizo bullying a ${user}`)
            .setImage(bully)

            return interaction.reply({ embeds: [embedBully]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'bonk'){
            /*
            BONK
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const bonk = soyultro('bonk') //Gif que va a recoger el bot

            const embedBonk = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} le golpeo en la cabeza a ${user}`)
            .setImage(bonk)

            return interaction.reply({ embeds: [embedBonk]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'bye'){
            /*
            BYE
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario
            
            const bye = soyultro('bye') //Gif que va a recoger el bot
            
            if(!user){ //Si el usuario no menciono ejecutaremos esto

                const embedByeNoMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} le dijo adios a todo el mundo.`)
                .setImage(bye)
    
                return interaction.reply({ embeds: [embedByeNoMention]}) //Retorna el gif con el texto

            }

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


            //Si el usuario menciono a alguien ejecutara lo primero
            if(user){

                const embedByeMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} le dijo adios a ${user}`)
                .setImage(bye)
    
                return interaction.reply({ embeds: [embedByeMention]}) //Retorna el gif con el texto (Si hay usuario)

            } 
        } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'cry'){
            /*
            CRY
            */
           //En este caso no necesitaremos usuario o embeds de error ya que no pide usuario.
           try{
           const cry = soyultro('cry') //Gif que va a recoger el bot

           const embedCry = new MessageEmbed()
           .setColor(config.defaultSuccessColor)
           .setDescription(`${interaction.user} esta triste`)
           .setImage(cry)
           
           return interaction.reply({ embeds: [embedCry]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'cringe'){
            /*
            CRINGE
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario
            
            const cringe = soyultro('cringe') //Gif que va a recoger el bot
            
            if(!user){ //Si el usuario no menciono ejecutaremos esto

                const embedCringeNoMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} esta asqueado.`)
                .setImage(cringe)
    
                return interaction.reply({ embeds: [embedCringeNoMention]}) //Retorna el gif con el texto

            }

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


            //Si el usuario menciono a alguien ejecutara lo primero
            if(user){

                const embedCringeMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} miro con asco a ${user}`)
                .setImage(cringe)
    
                return interaction.reply({ embeds: [embedCringeMention]}) //Retorna el gif con el texto (Si hay usuario)

            } 
        } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'cuddle'){
            /*
            CUDDLE
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const cuddle = soyultro('cuddle') //Gif que va a recoger el bot

            const embedCuddle = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} se acurruco con ${user}`)
            .setImage(cuddle)

            return interaction.reply({ embeds: [embedCuddle]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'feed'){
            /*
            FEED
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario
            
            const feed = soyultro('feed') //Gif que va a recoger el bot
            
            if(!user){ //Si el usuario no menciono ejecutaremos esto

                const embedFeedNoMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} esta comiendo.`)
                .setImage(feed)
    
                return interaction.reply({ embeds: [embedFeedNoMention]}) //Retorna el gif con el texto

            }

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


            //Si el usuario menciono a alguien ejecutara lo primero
            if(user){

                const embedFeedMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} le dio de comer a ${user}`)
                .setImage(feed)
    
                return interaction.reply({ embeds: [embedFeedMention]}) //Retorna el gif con el texto (Si hay usuario)

            } 
        } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'hate'){
            /*
            HATE
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const hate = soyultro('hate') //Gif que va a recoger el bot

            const embedHate = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} esta mirando con odio a ${user}`)
            .setImage(hate)

            return interaction.reply({ embeds: [embedHate]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'hi'){
            /*
            HI
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario
            
            const hi = soyultro('hi') //Gif que va a recoger el bot
            
            if(!user){ //Si el usuario no menciono ejecutaremos esto

                const embedHiNoMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} saludo a todo el mundo.`)
                .setImage(hi)
    
                return interaction.reply({ embeds: [embedHiNoMention]}) //Retorna el gif con el texto

            }

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


            //Si el usuario menciono a alguien ejecutara lo primero
            if(user){

                const embedHiMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} saludo a ${user}`)
                .setImage(hi)
    
                return interaction.reply({ embeds: [embedHiMention]}) //Retorna el gif con el texto (Si hay usuario)

            } 
        } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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
        
        } else if(interaction.options.getSubcommand() === 'hug'){
            /*
            HUG
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const hug = soyultro('hug') //Gif que va a recoger el bot

            const embedHug = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} abrazo a ${user}`)
            .setImage(hug)

            return interaction.reply({ embeds: [embedHug]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'kill'){
            /*
            KILL
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const kill = soyultro('kill') //Gif que va a recoger el bot

            const embedKill = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} mato a ${user}`)
            .setImage(kill)

            return interaction.reply({ embeds: [embedKill]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'kiss'){
            /*
            KISS
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const kiss = soyultro('kiss') //Gif que va a recoger el bot

            const embedKiss = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} beso a ${user}`)
            .setImage(kiss)

            return interaction.reply({ embeds: [embedKiss]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'lick'){
            /*
            LICK
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const lick = soyultro('lick') //Gif que va a recoger el bot

            const embedLick = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} lamio a ${user}`)
            .setImage(lick)

            return interaction.reply({ embeds: [embedLick]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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
        
        } else if(interaction.options.getSubcommand() === 'nope'){
            /*
            NOPE
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const nope = soyultro('nope') //Gif que va a recoger el bot

            const embedNope = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} le dijo que no a ${user}`)
            .setImage(nope)

            return interaction.reply({ embeds: [embedNope]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'pat'){
            /*
            PAT
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const pat = soyultro('pat') //Gif que va a recoger el bot

            const embedPat = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} le hizo pat a ${user}`)
            .setImage(pat)

            return interaction.reply({ embeds: [embedPat]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'poke'){
            /*
            POKE
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario

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

            const poke = soyultro('poke') //Gif que va a recoger el bot

            const embedPoke = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`${interaction.user} esta molestando a ${user}`)
            .setImage(poke)

            return interaction.reply({ embeds: [embedPoke]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'sleep'){
            /*
            SLEEP
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario
            
            const sleep = soyultro('sleep') //Gif que va a recoger el bot
            
            if(!user){ //Si el usuario no menciono ejecutaremos esto

                const embedSleepNoMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} esta durmiendo.`)
                .setImage(sleep)
    
                return interaction.reply({ embeds: [embedSleepNoMention]}) //Retorna el gif con el texto

            }

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


            //Si el usuario menciono a alguien ejecutara lo primero
            if(user){

                const embedSleepMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} esta durmiendo con ${user}`)
                .setImage(sleep)
    
                return interaction.reply({ embeds: [embedSleepMention]}) //Retorna el gif con el texto (Si hay usuario)

            } 
        } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'happy'){
            /*
            HAPPY
            */
           //En este caso no necesitaremos usuario o embeds de error ya que no pide usuario.
           try{
           const happy = soyultro('happy') //Gif que va a recoger el bot 

           const embedHappy = new MessageEmbed()
           .setColor(config.defaultSuccessColor)
           .setDescription(`${interaction.user} esta feliz :D`)
           .setImage(happy)

           return interaction.reply({ embeds: [embedHappy]}) //Retorna el gif con el texto
           } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'think'){
            /*
            SLEEP
            */
           try{
            const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario
            
            const think = soyultro('think') //Gif que va a recoger el bot
            
            if(!user){ //Si el usuario no menciono ejecutaremos esto

                const embedThinkNoMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} esta pensando.`)
                .setImage(think)
    
                return interaction.reply({ embeds: [embedThinkNoMention]}) //Retorna el gif con el texto

            }

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


            //Si el usuario menciono a alguien ejecutara lo primero
            if(user){

                const embedThinkMention = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} esta pensando en ${user}`)
                .setImage(think)
    
                return interaction.reply({ embeds: [embedThinkMention]}) //Retorna el gif con el texto (Si hay usuario)

            } 
        } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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

        } else if(interaction.options.getSubcommand() === 'yes'){
            /*
            YES
            */
            try{
                const user = interaction.options.getUser('user') //Recogemos lo que puso el usuario
    
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
    
                const yes = soyultro('yes') //Gif que va a recoger el bot
    
                const embedYes = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setDescription(`${interaction.user} le dijo que si a ${user}`)
                .setImage(yes)
    
                return interaction.reply({ embeds: [embedYes]}) //Retorna el gif con el texto
               } catch (e){ //Si hay error lo notificara al usuario y luego lo enviara al canal privado
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
}