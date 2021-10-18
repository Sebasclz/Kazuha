const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config.json')
const moment = require('moment')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('serverinfo')
                .setDescription('Devuelve la informacion del servidor.'),
    async run(client, interaction){
        try{
            const filterLevels = {
                DISABLED: 'Apagado',
                MEMBERS_WITHOUT_ROLES: 'Sin rol',
                ALL_MEMBERS: 'Todos'
            };
            
                const verificationLevels = {
                    NONE: 'Ninguno',
                    LOW: 'Bajo',
                    MEDIUM: 'Medio',
                    HIGH: '(╯°□°）╯︵ ┻━┻',
                    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
                };

            const guild = interaction.guild

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Icono del servidor')
                .setStyle('LINK')
                .setURL(`${guild.iconURL({ dynamic: true })}`)
                .setEmoji('🔰'),
            )
            
            const embed = new MessageEmbed()
                .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true }))
                .addField(`🏆 Nombre del servidor`, "```" + `${interaction.guild.name}` + "```", true)
                .addField(`🔗 ID del servidor`, "```" + `${interaction.guild.id}` + "```", true)
                .addField(`⏳ Creado el`, "```" + `${moment(guild.createdAt).format('DD MMM YYYY HH:mm a')}` + "```", false)
                .addField(`🔓 Nivel de verificacion`, "```" +  `${verificationLevels[interaction.guild.verificationLevel]}` + "```", true)
                .addField(`⛔ Filtro explicito`, "```" +  `${filterLevels[interaction.guild.explicitContentFilter]}` + "```", true)
                .addField(`👑 Dueño del servidor`, "```" + `${(await interaction.guild.fetchOwner()).user.tag}` + "```", true)
                .addField(`👑 ID del dueño`, "```" + `${interaction.guild.ownerId}` + "```", true)
                .addField(`🙋‍♂️ Numero de miembros`, "```" + `${interaction.guild.memberCount.toString()}` + "```", true)
                .addField(`🤖 Numero de bots`, "```" + `${interaction.guild.members.cache.filter(m => m.user.bot).size}` + "```", true)
                .addField(`🏷️ Numero de roles`, "```" + `${interaction.guild.roles.cache.size}` + "```", true)
                .addField(`😎 Numero de emojis`, "```" +  `${interaction.guild.emojis.cache.size}` + "```", true)
                .addField(`🚀 Numero de boost`, "```" +  `${interaction.guild.premiumSubscriptionCount.toString()}` + "```", true)
                .setColor(config.defaultSuccessColor)
                .setFooter(`${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
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
    }
}