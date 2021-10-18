const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config.json')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Devuelve la informacion de un usuario.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('Mencionar al usuario para ver su informacion o revisa tu propia informacion.')),
    async run(client, interaction) {   
        try{
            //Guardamos informacion del usuario mencionado
            moment.updateLocale('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
              })

              const flags = {
                DISCORD_EMPLOYEE: "Discord Employee",
                PARTNERED_SERVER_OWNER: "Discord Partner",
                BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
                BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
                HYPESQUAD_EVENTS: "HypeSquad Events",
                HOUSE_BRAVERY: "House of Bravery",
                HOUSE_BRILLIANCE: "House of Brilliance",
                HOUSE_BALANCE: "House of Balance",
                EARLY_SUPPORTER: "Early Supporter",
                TEAM_USER: "Team User",
                SYSTEM: "System",
                VERIFIED_BOT: "Verified Bot",
                EARLY_VERIFIED_BOT_DEVELOPER: "Verified Bot Developer",
                DISCORD_CERTIFIED_MODERATOR: "Discord Certified Moderator"
            };

            const Target = interaction.options.getUser('user') || interaction.user
            const Member = interaction.guild.members.cache.get(Target.id)
            const userFlags = Target.flags.toArray();
            

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Avatar del usuario')
                .setStyle('LINK')
                .setURL(`${Target.displayAvatarURL({ dynamic: true })}`)
                .setEmoji('👤'),
            )
            
            
                const embed = new MessageEmbed()
                    .setAuthor(`Informacion de ${Target.username}`)
                    .setThumbnail(Target.displayAvatarURL({dynamic: true, size: 4096}))
                    .setColor(config.defaultSuccessColor)
                    .addField(`🙋‍♂️ Nombre`, "```" + `${Target.username}` + "```", true)
                    .addField(`🏷️ Tag`, "```" + `${Target.discriminator}` + "```", true)
                    .addField(`📌 Apodo del usuario`, "```" + `${Member.nickname !== null ? Member.nickname : 'Ninguno'}` + "```", true)
                    .addField(`🔗 ID`, "```" + `${Target.id}` + "```", false)
                    .addField(`⏳ Usuario de Discord desde`, "```" + `${moment.utc(Target.createdAt).format('LLLL')}` + "```", true)
                    .addField(`⏳ Miembro del servidor desde`, "```" + `${moment.utc(Member.joinedAt).format('LLLL')}` + "```", true)
                    .addField(`🏳️ Emblemas`, "```" + `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Ninguno'}` + "```", false)
                    .addField(`🚀 Boost`, "```" + `${Member.premiumSince ? 'Esta boosteando 🚀' : 'No esta boosteando.'}` + "```", false)
                    .setFooter(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                await interaction.reply({ embeds: [embed], components: [row] })
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
            }
}