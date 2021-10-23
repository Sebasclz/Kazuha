const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const capitalize = require('../../functions/capitalize')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('roleinfo')
            .setDescription('Devuelve la informacion de un rol.')
            .addRoleOption(option =>
                option.setName('role')
                .setDescription('Selecciona un rol.')
                .setRequired(true)),
    async run(client, interaction) {
        try{

            const role = interaction.options.getRole('role')

            const roleName = capitalize(`${role.name}`)

            const embed = new MessageEmbed()
            .setTitle(`Informacion sobre el rol ${roleName}`)
            .addField('Nombre', "```" + `${role.name}` + "```", true)
            .addField('ID del rol', "```" + `${role.id}` + "```", true)
            .addField('Miembros con el rol', "```" + `${role.members.size === 0 ? 'Ningun miembro tiene el rol' : role.members.size}` + "```", false)
            .addField('Posicion', "```" + `${role.rawPosition}` + "```", false)
            .addField('Color en hexadecimal', "```" + `${role.hexColor}` + "```", false)
            .addField('Mencionable', "```" + `${role.mentionable === true ? 'Si' : 'No'}` + "```", true)
            .addField("Gestionado por el sistema", "```" + `${role.managed === true ? 'Si' : 'No'}` + "```", true)
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
    }
}