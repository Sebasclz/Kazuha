const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment, MessageButton, MessageActionRow } = require('discord.js')
const config = require('../../config.json')
const fetch = require('node-fetch')
const axios = require('axios')
const minecraft = require('minecraft-information')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
        .setDescription('Devuelve comandos de informacion de videojuegos')
        .addSubcommandGroup(subcommandgroup => 
            subcommandgroup
            .setName('geometry-dash')
            .setDescription('Comandos de Geometry Dash')
        //Command 1 Geometry-Dash
        .addSubcommand(subcommand => 
            subcommand
            .setName('level')
            .setDescription('Regresa informacion de un nivel de Geometry Dash.')
            .addStringOption(option =>
                option.setName('id')
                    .setDescription('ID del nivel')
                    .setRequired(true)))
        //Command 2 Geometry-Dash
        .addSubcommand(subcommand => 
            subcommand
            .setName('user')
            .setDescription('Regresa informacion de un usuario de Geometry Dash.')
                .addStringOption(option => 
                    option.setName('user')
                    .setDescription("Nombre del usuario")
                    .setRequired(true)))

        //Command 3 Geometry-Dash
        .addSubcommand(subcommand => 
            subcommand
            .setName('text')
            .setDescription('Devuelve el texto con el formato de Geometry Dash.')
                .addStringOption(option => 
                    option.setName('text')
                    .setDescription("Ingresa el texto")
                    .setRequired(true))))

        .addSubcommandGroup(subcommandgroup => 
            subcommandgroup
            .setName('minecraft')
            .setDescription('Comandos de Minecraft')
            
        //Command 1 Minecraft
        .addSubcommand(subcommand => 
            subcommand
            .setName('server')
            .setDescription('Regresa informacion de un servidor de Minecraft.')
                .addStringOption(option => 
                    option.setName('ip')
                    .setDescription("IP del servidor")
                    .setRequired(true))
                .addStringOption(option => 
                    option.setName('port')
                    .setDescription("Puerto del servidor (Por defecto sera 25565)")))

        //Command 2 Minecraft
        .addSubcommand(subcommand => 
            subcommand
            .setName('logro')
            .setDescription('Haz un logro de Minecraft')
                .addStringOption(option => 
                    option.setName('text')
                    .setDescription("Texto que aparecera en el logro")
                    .setRequired(true)))

        //Command 3 Minecraft
        .addSubcommand(subcommand => 
            subcommand
            .setName('hypixel')
            .setDescription('Busca informacion de tu usuario en Hypixel')
                .addStringOption(option => 
                    option.setName('name')
                    .setDescription("Nombre de tu cuenta de Minecraft")
                    .setRequired(true)))

        //Command 4 Minecraft
        .addSubcommand(subcommand => 
            subcommand
            .setName('skin')
            .setDescription('Regresa tu skin en version 3D')
                .addStringOption(option => 
                    option.setName('name')
                    .setDescription("Nombre de tu cuenta de Minecraft")
                    .setRequired(true)))),
        async run(client, interaction){
            if(interaction.options.getSubcommand() === "level"){
                /*
                GDLEVEL
                */
            try{
                const levelGD = interaction.options.getString('id') //Recogemos el nivel que menciono
                    
                const res = await fetch(`https://gdbrowser.com/api/level/${levelGD}`) //Llamamos a la asquerosa API de Colon
                const json = await res.json(); //Lo convertimos en un JSON para sacar los datos
                    
                const embedError = new MessageEmbed() //Embed si la ID del nivel no existe
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No existe la ID del nivel mencionado o la has escrito mal')
                    
                if(json.id === undefined) return interaction.reply({ embeds: [embedError]}) //Si el nivel no existe regresara esto
                    
                const embedLevel = new MessageEmbed() //Embed por si todo sale bien
                    .setColor(config.defaultSuccessColor)
                    .setTitle(`ℹ️ Informacion del nivel: ${json.name}`)
                    .addField('🏷️ Nombre del nivel', "```" + json.name + "```", true)
                    .addField('📌 Descripcion del nivel', "```" + json.description + "```", true)
                    .addField('👑 Creador del nivel', "```" + json.author + "```", true)
                    .addField('📊 Dificultad', "```" + json.difficulty + "```", true)
                    .addField('👍 Likes', "```" + json.likes + "```", true)
                    .addField('👎 ¿Son dislikes?', "```" + `${json.disliked ===  false ? `No son dislikes ` : `Si son dislikes`}` + "```", true)
                    .addField('📏 Longitud', "```" + json.length + "```", true)
                    .addField('⭐ Estrellas', "```" + json.stars + "```", true)
                    .addField('🔵 Orbes', "```" + json.orbs + "```", true)
                    .addField('💎 Diamantes', "```" + json.diamonds + "```", true)
                    .addField('🪙 Monedas', "```" + json.coins + "```", true)
                    .addField('✅ ¿Las monedas son verificadas?', "```" + `${json.verifiedCoins ===  true ? `Si lo son` : `No lo son o no tiene`}` + "```", true)
                    .addField('🛠️ Featured', "```" + `${json.featured ===  false ? `No tiene` : `Si tiene`}` + "```", true)
                    .addField('🔥 Epic', "```" + `${json.epic ===  false ? `No tiene` : `Si tiene`}` + "```", true)
                    .addField('📈 LDM', "```" + `${json.ldm ===  false ? `No tiene` : `Si tiene`}` + "```", true)
                    .addField('🏷️ Nombre de la cancion', "```" + json.songName + "```", false)
                    .addField('👑 Autor de la cancion', "```" + json.songAuthor + "```", true)
                    .addField('📌 Tamaño de la cancion', "```" + json.songSize + "```", true)
                    
                return interaction.reply({ embeds: [embedLevel]}) //Si el usuario existe regresara esto
                    
            } catch(e){ //Si encuentra algun error lo reportara y le avisara al usuario.
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
            
            } else if(interaction.options.getSubcommand() === "user"){
                /*
                GDUSER
                */
                try{
                    const userGD = interaction.options.getString('user') //Recogemos el usuario que menciono

                    const res = await fetch(`https://gdbrowser.com/api/profile/${userGD}`) //Llamamos a la asquerosa API de Colon
                    const json = await res.json(); //Lo convertimos en un JSON para sacar los datos

                    const embedError = new MessageEmbed() //Embed si el usuario no existe
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('No existe el usuario mencionado o lo has escrito mal')

                    if(json.username === undefined) return interaction.reply({ embeds: [embedError]}) //Si el usuario no existe regresara esto

                    const embedUser = new MessageEmbed() //Embed por si todo sale bien
                    .setColor(config.defaultSuccessColor)
                    .setTitle(`ℹ️ Informacion del usuario: ${userGD}`)
                    .addField('🏷️ Nombre:', "```" + json.username + "```", true)
                    .addField('🔗 ID del jugador', "```" + json.playerID + "```", true)
                    .addField('🔗 ID de la cuenta', "```" + json.accountID + "```", true)
                    .addField('⭐ Estrellas', "```" + json.stars + "```", true)
                    .addField('💎 Diamantes', "```" + json.diamonds + "```", true)
                    .addField('🪙 Monedas', "```" + json.coins + "```", true)
                    .addField('🪙 Monedas de usuario', "```" + json.userCoins + "```", true)
                    .addField('👿 Demons', "```" + json.demons + "```", true)
                    .addField('🛠️ Puntos de creador', "```" + json.cp + "```", true)
                    .addField('📊 Rank', "```" + json.rank + "```", true)
                    .addField('✨ ¿Tiene glow en sus iconos?', "```" + `${json.glow ===  false ? `No tiene` : `Si tiene`}` + "```", true)
                    .setThumbnail(`https://gdbrowser.com/icon/${json.username}`)

                
                    return interaction.reply({ embeds: [embedUser]}) //Si el usuario existe regresara esto

                    } catch(e){ //Si encuentra algun error lo reportara y le avisara al usuario.
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

            } else if(interaction.options.getSubcommand() === "text"){
                /*
                GDTEXT
                */
                try{
                    
                    const textGD = interaction.options.getString('text') //Recogemos lo que puso el usuario

                    const embed = new MessageEmbed() //Embed por si todo sale bien 
                    .setColor(config.defaultSuccessColor)
                    .setImage(`https://gdcolon.com/tools/gdlogo/img/${textGD}`)

                    return interaction.reply({ embeds: [embed] })

                    } catch(e){ //Si encuentra algun error lo reportara y le avisara al usuario.
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
                     
            } else if(interaction.options.getSubcommand() === "server"){
                /*
                MCSERVER
                */
               try{

               const ipSV = interaction.options.getString('ip')
               const portSV = interaction.options.getString('port')
               
               if(portSV){
                url = `http://status.mclive.eu/${ipSV}/${ipSV}/${portSV}/banner.png`
               } else {
                url = `http://status.mclive.eu/${ipSV}/${ipSV}/25565/banner.png`
               } axios.get(url, {
                   responseType: "arraybuffer",
               })
               .then((image) => {
                let returnedB64 = Buffer.from(image.data).toString("base64");
                const sfattach = new MessageAttachment(
                    image.data,
                    "output.png"
                )
                interaction.reply({ files: [sfattach]})
               }).catch(() => {
                    const embedError = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('El servidor que has puesto no existe o se encuentra apagado.')
                    
                    interaction.reply({ embeds: [embedError]})
                });
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
            } else if(interaction.options.getSubcommand() === "logro"){
                /*
                MCLOGRO
                */
                try{
                    
                    const logro = interaction.options.getString('text')

                    const textLogro = logro.replace(/( )/g, '+')

                    if(logro.length > 23) return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('El logro solo puede tener hasta 23 caracteres')
                    ]})

                    if(logro.length < 2) return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(config.defaultErrorColor)
                        .setTitle('Error')
                        .setDescription('El logro tiene que tener mas de 2 caracteres')
                    ]})

                    const imagen = Math.floor(Math.random() * 38) + 1

                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setImage(`https://minecraftskinstealer.com/achievement/${imagen}/%C2%A1Logro+obtenido%21/${textLogro}`)

                    return interaction.reply({ embeds: [embed]})

                    } catch(e){ //Si encuentra algun error lo reportara y le avisara al usuario.
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
            } else if(interaction.options.getSubcommand() === "hypixel"){
                    /*
                    MCHYPIXEL
                    */
                try{
                        
                    const name = interaction.options.getString('name')

                    try{
                            
                        const hypixel = await minecraft.hypixel(name)
                        const head = await minecraft.head(name)

                        const embed = new MessageEmbed()
                        .setColor(config.defaultSuccessColor)
                        .setTitle(`Informacion de ${hypixel.player.displayname}`)
                        .setThumbnail(head)
                        .addField('Experiencia', "```" + hypixel.player.networkExp + "```", true)
                        .addField('Monedas generales', "```" + hypixel.player.achievements.general_coins + "```", true)
                        .addField('Karma', "```" + hypixel.player.karma + "```", true)
                        .addField('Rango', "```" + `${hypixel.player.newPackageRank === undefined ? 'Usuario' : hypixel.player.newPackageRank}` + "```", false)
                        .addField('Lenguaje que utiliza', "```" + hypixel.player.userLanguage + "```", false)
                        .addField('Racha maxima de conexiones diarias', "```" + hypixel.player.rewardHighScore + "```", true)
                        .addField('Racha actual de conexiones diarias', "```" + hypixel.player.rewardScore + "```", true)
                        .addField('Total de regalos diarios obtenidos', "```" + hypixel.player.totalDailyRewards + "```", true)
                        .setFooter(interaction.user.username, interaction.user.avatarURL())
                        .setTimestamp()

                        return interaction.reply({ embeds: [embed], components: [
                            new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setLabel('Cabeza del usuario')
                                .setStyle('LINK')
                                .setURL(`https://cravatar.eu/helmhead/${name}/600.png`)
                                .setEmoji('👤'),
                                )
                            ]})

                    } catch {
                        interaction.reply({ embeds: [
                            new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle('Error')
                            .setDescription('No se ha encontrado el usuario, no existe o ha ocurrido un error. Por favor intentelo nuevamente.')
                            .setTimestamp()
                            .setFooter(interaction.user.username, interaction.user.avatarURL())
                        ]})
                    }

                    } catch(e){ //Si encuentra algun error lo reportara y le avisara al usuario.
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

                } else if(interaction.options.getSubcommand() === "skin"){
                    /*
                    MCSKIN
                    */
                    try{
                        
                        const name = interaction.options.getString('name')

                        try{
                            
                            
                            const body = await minecraft.body(name)
                            
                            const hypixel = await minecraft.hypixel(name)
                            
                            const uuid = hypixel.player.uuid

                            const embed = new MessageEmbed()
                            .setColor(config.defaultSuccessColor)
                            .setImage(`${body}`)
                            .setFooter(interaction.user.username, interaction.user.avatarURL())
                            .setTimestamp()

                            return interaction.reply({ embeds: [embed], components: [
                                new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                    .setLabel('Skin en 3D del usuario')
                                    .setStyle('LINK')
                                    .setURL(`https://crafatar.com/renders/body/${uuid}?size=512&default=MHF_Steve&overlay&scale=10.png`)
                                    .setEmoji('👤'),
                                )
                            ]})

                        } catch {
                            interaction.reply({ embeds: [
                                new MessageEmbed()
                                .setColor(config.defaultErrorColor)
                                .setTitle('Error')
                                .setDescription('El usuario que has puesto no se encontro, no existe o ha ocurrido un error. Por favor intentelo nuevamente.')
                                .setTimestamp()
                                .setFooter(interaction.user.username, interaction.user.avatarURL())
                            ]})
                        }

                        } catch(e){ //Si encuentra algun error lo reportara y le avisara al usuario.
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