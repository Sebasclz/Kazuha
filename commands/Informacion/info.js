const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton, Util, version } = require('discord.js')
const config = require('../../config.json')
const moment = require('moment')
require('moment-duration-format')
const capitalize = require('../../functions/capitalize')
const osu = require('node-os-utils')
const os = require('os')
const diagramMaker = require('../../functions/diagramMaker.js')
const dApi = require('dthings-api')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Devuelve comandos de informacion')
            
        //Command 1
        .addSubcommand(subcommand => 
            subcommand
            .setName('user')
            .setDescription('Devuelve la informacion de un usuario.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Mencionar al usuario para ver su informacion o revisa tu propia informacion.')))
            
        //Command 2
        .addSubcommand(subcommand => 
            subcommand
            .setName('server')
                .setDescription('Devuelve la informacion del servidor.'))
            
        //Command 3
        .addSubcommand(subcommand => 
            subcommand
            .setName('role')
            .setDescription('Devuelve la informacion de un rol.')
            .addRoleOption(option =>
                option.setName('role')
                .setDescription('Selecciona un rol.')
                .setRequired(true)))

        //Command 4
        .addSubcommand(subcommand => 
            subcommand
            .setName('channel')
            .setDescription('Devuelve la informacion de un canal.')
            .addChannelOption(option =>
                option.setName('channel')
                .setDescription('Selecciona el canal.')
                .setRequired(true)))

        //Command 5
        .addSubcommand(subcommand => 
            subcommand
            .setName('bot')
                .setDescription('Devuelve informacion del bot.'))

        //Command 5
        .addSubcommand(subcommand => 
            subcommand
            .setName('dthings')
                .setDescription('Devuelve informacion del bot en DiscordThings.')),
        async run(client, interaction){
            if(interaction.options.getSubcommand() === 'user'){
                /*
                USER
                */
        try{
            moment.updateLocale('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
              })

              const flags = {
                DISCORD_EMPLOYEE: "Empleado de Discord",
                PARTNERED_SERVER_OWNER: "Partner de Discord",
                BUGHUNTER_LEVEL_1: "Cazador de bugs (Nivel 1)",
                BUGHUNTER_LEVEL_2: "Cazador de bugs (Nivel 2)",
                HYPESQUAD_EVENTS: "Representante del HypeSquad",
                HOUSE_BRAVERY: "Bravery del HypeSquad",
                HOUSE_BRILLIANCE: "Brilliance del HypeSquad",
                HOUSE_BALANCE: "Balance del HypeSquad",
                EARLY_SUPPORTER: "Partidario inicial",
                TEAM_USER: "Usuario del equipo",
                VERIFIED_BOT: "Bot verificado",
                EARLY_VERIFIED_BOT_DEVELOPER: "Desarrollador inicial de bots verificado",
                DISCORD_CERTIFIED_MODERATOR: "Moderador de Discord certificado"
            };

            const Target = interaction.options.getUser('user') || interaction.user
            const Member = interaction.guild.members.cache.get(Target.id)
            const userFlags = Target.flags.toArray();
            
            const user = await client.users.fetch(Target.id, {force: true})

            const avatarURL = Target.avatarURL({ dynamic: true, size: 4096, format: 'png' })

            const bannerURL = Target.bannerURL({ dynamic: true, size: 512 })

            const rowBanner = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Avatar del usuario')
                    .setStyle('LINK')
                    .setURL(`${avatarURL}`)
                    .setEmoji('👤'),

                    new MessageButton()
                    .setLabel('Banner del usuario')
                    .setStyle('LINK')
                    .setURL(`${bannerURL}`)
                    .setEmoji('👤'),
                )

                const rowNoBanner = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Avatar del usuario')
                    .setStyle('LINK')
                    .setURL(`${avatarURL}`)
                    .setEmoji('👤'),
                )
            
            if(!user.bannerURL() || Target.bot){
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setAuthor(`Informacion de ${Target.username}`)
                    .setThumbnail(Target.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
                    .setColor(config.defaultSuccessColor)
                    .addField(`🙋‍♂️ Nombre`, "```" + `${Target.username}` + "```", true)
                    .addField(`🏷️ Tag`, "```" + `${Target.discriminator}` + "```", true)
                    .addField(`📌 Apodo del usuario`, "```" + `${Member.nickname !== null ? Member.nickname : 'No tiene apodo'}` + "```", true)
                    .addField(`🔗 ID`, "```" + `${Target.id}` + "```", false)
                    .addField(`⏳ Usuario de Discord desde`, "```" + `${moment.utc(Target.createdAt).format('LLLL')}` + "```", true)
                    .addField(`⏳ Miembro del servidor desde`, "```" + `${moment.utc(Member.joinedAt).format('LLLL')}` + "```", true)
                    .addField(`🏳️ Emblemas`, "```" + `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'No tiene insignias'}` + "```", false)
                    .addField(`🚀 Boost`, "```" + `${Member.premiumSince ? 'Esta boosteando 🚀' : 'No esta boosteando.'}` + "```", false)
                    .setFooter(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                ], components: [rowNoBanner]
            })
                
            } else {
                const embed = new MessageEmbed()
                    .setAuthor(`Informacion de ${Target.username}`)
                    .setThumbnail(Target.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
                    .setColor(config.defaultSuccessColor)
                    .addField(`🙋‍♂️ Nombre`, "```" + `${Target.username}` + "```", true)
                    .addField(`🏷️ Tag`, "```" + `${Target.discriminator}` + "```", true)
                    .addField(`📌 Apodo del usuario`, "```" + `${Member.nickname !== null ? Member.nickname : 'No tiene apodo'}` + "```", true)
                    .addField(`🔗 ID`, "```" + `${Target.id}` + "```", false)
                    .addField(`⏳ Usuario de Discord desde`, "```" + `${moment.utc(Target.createdAt).format('LLLL')}` + "```", true)
                    .addField(`⏳ Miembro del servidor desde`, "```" + `${moment.utc(Member.joinedAt).format('LLLL')}` + "```", true)
                    .addField(`🏳️ Emblemas`, "```" + `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'No tiene insignias'}` + "```", false)
                    .addField(`🚀 Boost`, "```" + `${Member.premiumSince ? 'Esta boosteando 🚀' : 'No esta boosteando.'}` + "```", false)
                    .setFooter(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setImage(user.bannerURL({ dynamic: true, size: 512}))
                await interaction.reply({ embeds: [embed], components: [rowBanner]
                })
            }
            

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
            } else if(interaction.options.getSubcommand() === 'server'){
                /*
                SERVER
                */
        try{
            const filterLevels = {
                DISABLED: 'Apagado',
                MEMBERS_WITHOUT_ROLES: 'Sin rol',
                ALL_MEMBERS: 'Todos'
            };
            
            const verificationLevels = {
                NONE: "No hay restricciones.",
                LOW: "Leve (Cuenta verificada).",
                MEDIUM: "Media (Cuenta verificada al menos desde hace 5 minutos).",
                HIGH: "Alta (Cuenta verificada y miembro del servidor por +10 minutos).",
                VERY_HIGH: "Extrema (Cuenta verificada y número telefónico verificado vinculado).",
              };

              const boostLevels = {
                  NONE: 'Nivel 0',
                  TIER_1: 'Nivel 1',
                  TIER_2: 'Nivel 2',
                  TIER_3: 'Nivel 3',
              };

              const guild = interaction.guild

              const iconURL = guild.iconURL({ dynamic: true, format: 'png', size: 4096 })

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Icono del servidor')
                .setStyle('LINK')
                .setURL(`${iconURL}`)
                .setEmoji('🔰'),
            )

            moment.updateLocale('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
              })
            
                 const embed = new MessageEmbed()
                .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true }))
                .addField(`🏆 Nombre del servidor`, "```" + `${interaction.guild.name}` + "```", true)
                .addField(`🔗 ID del servidor`, "```" + `${interaction.guild.id}` + "```", true)
                .addField(`⏳ Creado el`, "```" + `${moment(guild.createdAt).format('LLLL')}` + "```", false)
                .addField(`🔓 Nivel de verificacion`, "```" +  `${verificationLevels[interaction.guild.verificationLevel]}` + "```", true)
                .addField(`⛔ Filtro explicito`, "```" +  `${filterLevels[interaction.guild.explicitContentFilter]}` + "```", true)
                .addField(`👑 Dueño del servidor`, "```" + `${(await interaction.guild.fetchOwner()).user.tag}` + "```", false)
                .addField(`👑 ID del dueño`, "```" + `${interaction.guild.ownerId}` + "```", false)
                .addField(`🙋‍♂️ Numero de miembros`, "```" + `${interaction.guild.memberCount.toString()}` + "```", true)
                .addField(`🏷️ Numero de roles`, "```" + `${interaction.guild.roles.cache.size}` + "```", true)
                .addField(`😎 Numero de emojis`, "```" +  `${interaction.guild.emojis.cache.size}` + "```", true)
                .addField(`💬 Canales de texto`, "```" + `${interaction.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size}` + "```", true)
                .addField(`🔊 Canales de voz`, "```" + `${interaction.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size}` + "```", true)
                .addField(`🗂️ Categorias`, "```" + `${interaction.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size}` + "```", true)
                .addField(`🚀 Numero de boost`, "```" +  `${interaction.guild.premiumSubscriptionCount.toString()}` + "```", true)
                .addField(`🚀 Nivel de boost`, "```" + `${boostLevels[interaction.guild.premiumTier]}` + "```", true)
                .setColor(config.defaultSuccessColor)
                .setFooter(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setTimestamp()
                 
                 await interaction.reply({ embeds: [embed], components: [row]})
           
            
           
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
            } else if(interaction.options.getSubcommand() === 'role'){
                /*
                ROLE
                */
        try{

            const role = interaction.options.getRole('role')

            const roleName = capitalize(`${role.name}`)

            const embed = new MessageEmbed()
            .setTitle(`Informacion sobre el rol ${roleName}`)
            .addField('🏆 Nombre', "```" + `${role.name}` + "```", true)
            .addField('🔗 ID del rol', "```" + `${role.id}` + "```", true)
            .addField('🗂️ Posicion', "```" + `${role.rawPosition}` + "```", false)
            .addField('🔶 Color en hexadecimal', "```" + `${role.hexColor}` + "```", false)
            .addField('📲 Mencionable', "```" + `${role.mentionable === true ? 'Si' : 'No'}` + "```", true)
            .addField("💻 Gestionado por el sistema", "```" + `${role.managed === true ? 'Si' : 'No'}` + "```", true)
            .setColor(role.hexColor)

            return interaction.reply({ embeds: [embed]})

        } catch(e){
            console.log(e)
            interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle('Error')
                .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                .setTimestamp()
                .setFooter(interaction.user.username, interaction.user.avatarURL())
            ]})
        };
            } else if(interaction.options.getSubcommand() === 'channel'){
                /*
                CHANNEL
                */
        try{
            moment.updateLocale('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
              })

            const channel = interaction.options.getChannel('channel') //Recogemos el canal que puso

            const cooldown = {
                0: 'No tiene cooldown',
                5: '5 segundos',
                10: '10 segundos',
                15: '15 segundos',
                30: '30 segundos',
                60: '1 minuto',
                120: '2 minutos',
                300: '5 minutos',
                600: '10 minutos',
                900: '15 minutos',
                1800: '30 minutos',
                3600: '1 hora',
                7200: '2 horas',
                21600: '6 horas'
            }

            const nameChannel = capitalize(`${ Util.escapeMarkdown(channel.name)}`)
            
            const channelType = channel.type

            if(channelType === 'GUILD_TEXT'){
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setTitle(`Informacion del canal de texto: ${nameChannel}`)
            .addField('🏆 Nombre', "```" + `${nameChannel}` + "```", true)
            .addField('🔗 ID del canal', "```" + `${channel.id}` + "```", true)
            .addField(`⏳ Creado el`, "```" + `${moment(channel.createdAt).format('LLLL')}` + "```", true)
            .addField('🔞 ¿NSFW?', "```" + `${channel.nsfw === false ? "No" : "Si"}` + "```", true)
            .addField('🗂️ Tipo del canal', "```" + `${channel.type === 'GUILD_VOICE' ? "Canal de voz" : "Canal de texto"}` + "```", true)
            .addField(`📜 Tema del canal`, "```" + `${channel.topic < 1 ? "No hay un tema" : channel.topic}` + "```", true)
            .addField(`📂 Su categoria es`, "```" + `${channel.parent.name}` + "```", true)
            .addField(`🕔 Cooldown del canal`, "```" + `${cooldown[channel.rateLimitPerUser]}` + "```", false)
            .addField(`🗂️ Posicion del canal`, "```" + `${channel.rawPosition}` + "```", false)
            return interaction.reply({ embeds: [embed]})

            } else if(channelType === 'GUILD_VOICE'){
                const bitrate = channel.bitrate

                const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setTitle(`Informacion del canal de voz: ${nameChannel}`)
            .addField('🏆 Nombre', "```" + `${nameChannel}` + "```", true)
            .addField('🔗 ID del canal', "```" + `${channel.id}` + "```", true)
            .addField(`⏳ Creado el`, "```" + `${moment(channel.createdAt).format('LLLL')}` + "```", true)
            .addField('🗂️ Tipo del canal', "```" + `${channel.type === 'GUILD_VOICE' ? "Canal de voz" : "Canal de texto"}` + "```", true)
            .addField(`📂 Su categoria es`, "```" + `${channel.parent.name}` + "```", true)
            .addField(`🗂️ Posicion del canal`, "```" + `${channel.rawPosition}` + "```", true)
            .addField(`🌎 Region del canal`, "```" + `${channel.rtcRegion === null ? 'No tiene asignado una region' : channel.rtcRegion}` + "```", true)
            .addField(`⛔ Limites de usuarios`, "```" + `${channel.userLimit === 0 ? 'No tiene limite de usuarios' : channel.userLimit}` + "```", false)
            .addField(`🔧 Tasa de bits del canal`, "```" + `${bitrate.toString().replace('000', 'kbps')}` + "```", false)
            return interaction.reply({ embeds: [embed]})

            } else if(channelType !== 'GUILD_TEXT' || channelType !== 'GUILD_VOICE'){
                
                const embedError = new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle('Error')
                .setDescription('Has seleccionado un tipo de canal que no permito.')

                return interaction.reply({ embeds: [embedError]})
            } else {
                const embedError2 = new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle('Error')
                .setDescription('Algo ha salido mal, por favor intente nuevamente.')

                return interaction.reply({ embeds: [embedError2]})
            }
        } catch(e){
            console.log(e)
            interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle('Error')
                .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                .setTimestamp()
                .setFooter(interaction.user.username, interaction.user.avatarURL())
            ]})
        };
            } else if(interaction.options.getSubcommand() === 'bot'){
                /*
                BOT
                */
        try{

            moment.updateLocale('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
              })
            await interaction.reply({ content: 'Obteniendo estado...'})
            
            let cpuUsage
            const cpu = osu.cpu

            const promises= [
                client.shard.fetchClientValues('guilds.cache.size'),
                client.shard.fetchClientValues('emojis.cache.size'),
                client.shard.fetchClientValues('channels.cache.size'),
                client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
                cpu.usage().then(cpuPercentage => {
                    cpuUsage = cpuPercentage
                })
            ]

            Promise.all(promises).then(async results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0)
                const totalEmojis = results[1].reduce((acc, emojisCount) => acc + emojisCount, 0)
                const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0)
                const totalMembers  = results[3].reduce((acc, memberCount) => acc + memberCount, 0)
                var mem =  osu.mem
                let freeRAM, usedRAM
    
                await mem.info().then(info => {
                    freeRAM = info['freeMemMb']
                    usedRAM = info['totalMemMb'] - freeRAM
                })
    
                const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setAuthor(`${client.user.username}`, client.user.avatarURL({ format: 'png' }))
                    .setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))
                    .setDescription(`\`\`\`asciidoc\n== Informacion basica ==
• Bot Name   :: ${client.user.username}
• Bot ID     :: ${client.user.id}
• Developer  :: iSebas#3534
• Vers Bot   :: v1.4
• Creado el  :: 25 de agosto\n
== Estadisticas ==
• Guilds     :: ${totalGuilds}
• Usuarios   :: ${totalMembers}
• Canales    :: ${totalChannels}
• Emojis     :: ${totalEmojis}\n
== Informacion tecnica ==
• Uso RAM    :: ${diagramMaker(usedRAM, freeRAM)} [${Math.round((100 * usedRAM) / (usedRAM + freeRAM))}%]
• Uso CPU    :: ${diagramMaker(cpuUsage, 100 - cpuUsage)} [${Math.round(cpuUsage)}%]
• CPU        :: Intel
• RAM        :: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
• SO         :: ${os.type} ${os.release} ${os.arch}
• En linea   :: ${moment.duration(client.uptime).format([`D [Dias], H [Horas], m [Minutos], s [Segundos]`])}
• Ult Inicio :: ${moment(client.readyAt).format("LLL")}\n
== Informacion extra ==
• Hosting    :: PyroNode
• Discord.js :: v${version}
• Node       :: ${process.version}\`\`\``)
                interaction.editReply({ content: ' ', embeds: [embed]}) 
            })

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

            } else if(interaction.options.getSubcommand() === 'dthings'){
                /*
                DTHINGS
                */
            try{

                return interaction.reply({ 
                    embeds: [
                        new MessageEmbed()
                        .setTitle('Comando deshabilitado')
                        .setColor(config.defaultErrorColor)
                        .setDescription('La pagina de DiscordThings se encuentra deshabilitada actualmente.\n\nEste comando sera habilitado cuando la pagina se encuentre devuelta en funcionamiento.')
                    ]})

                const infoBot = dApi.getInfoBot('898933117123973211')
                
                return interaction.reply({embeds: [
                    new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle(`Informacion de ${(await infoBot).name}`)
                .setThumbnail(`${(await infoBot).avatar}`)
                .addField('Nombre del bot', "```" + `${(await infoBot).name}` + "```", true)
                .addField('ID del bot', "```" + `${(await infoBot).id}` + "```", true)
                .addField('Descripcion', "```" + `${(await infoBot).description}` + "```", true)
                .addField('Prefix', "```" + `${(await infoBot).prefix}` + "```", true)
                .addField('Votos', "```" + `${(await infoBot).votes}` + "```", true)
                .addField('Invitaciones', "```" + `${(await infoBot).invites}` + "```", true)
                .addField('Tags', "```" + `${(await infoBot).tags.join(', ')}` + "```", true)
                .setFooter(`Owner del bot: ${(await infoBot).owner}`)
                .setTimestamp()
            ]})

            } catch(e) {
                console.log(e)
                interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                    .setTimestamp()
                    .setFooter(interaction.user.username, interaction.user.avatarURL())
                ]})
            };
            } else {
                return interaction.reply('No has seleccionado ningun subcomando.')
            }
        }
    }