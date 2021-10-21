const blacklist = require('../models/blacklist.js')
const guilds = require('../models/guilds.js')
const channelModel = require('../models/config.js')

module.exports = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    const channelInteraction = await channelModel.findOne({ guildId: interaction.guild.id, guildChannelId: interaction.channel.id})

    if(channelInteraction) {
        if(channelInteraction.guildChannelId === interaction.channel.id) return;
    }

    const userBlacklist = await blacklist.findOne({
        userId: interaction.user.id
    })

    if(userBlacklist) return;

    const guildModel = await guilds.findOne({ guildId: interaction.guild.id })

    if(guildModel === null){
    const newGuild = new guilds({
        guildId: interaction.guild.id.toString(),
        guildName: interaction.guild.name.toString(),
        ownerId: interaction.guild.ownerId.toString(),
        memberCount: interaction.guild.memberCount.toString(),
    })
    newGuild.save().catch(e => console.log(e))
}

    try {
        await command.run(client, interaction)
    } catch (e) {
        console.error(e)
    }
}