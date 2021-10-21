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

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Icono del servidor')
                .setStyle('LINK')
                .setURL(`${guild.iconURL({ dynamic: true, format: 'png', size: 4096 })}`)
                .setEmoji('🔰'),
            )
            
            const embed = new MessageEmbed()
                .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true }))
                .addField(`🏆 Nombre del servidor`, "```" + `${interaction.guild.name}` + "```", true)
                .addField(`🔗 ID del servidor`, "```" + `${interaction.guild.id}` + "```", true)
                .addField(`⏳ Creado el`, "```" + `${moment(guild.createdAt).format('DD MMM YYYY HH:mm a')}` + "```", false)
                .addField(`🔓 Nivel de verificacion`, "```" +  `${verificationLevels[interaction.guild.verificationLevel]}` + "```", true)
                .addField(`⛔ Filtro explicito`, "```" +  `${filterLevels[interaction.guild.explicitContentFilter]}` + "```", true)
                .addField(`👑 Dueño del servidor`, "```" + `${(await interaction.guild.fetchOwner()).user.tag}` + "```", false)
                .addField(`👑 ID del dueño`, "```" + `${interaction.guild.ownerId}` + "```", false)
                .addField(`🙋‍♂️ Numero de miembros`, "```" + `${interaction.guild.memberCount.toString()}` + "```", true)
                .addField(`🤖 Numero de bots`, "```" + `${interaction.guild.members.cache.filter(m => m.user.bot).size}` + "```", true)
                .addField(`🏷️ Numero de roles`, "```" + `${interaction.guild.roles.cache.size}` + "```", true)
                .addField(`😎 Numero de emojis`, "```" +  `${interaction.guild.emojis.cache.size}` + "```", true)
                .addField(`🚀 Numero de boost`, "```" +  `${interaction.guild.premiumSubscriptionCount.toString()}` + "```", true)
                .addField(`🚀Nivel de boost`, "```" + `${boostLevels[interaction.guild.premiumTier]}` + "```", true)
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
    }
}