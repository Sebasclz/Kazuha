const blacklist = require('../models/blacklist.js')
const channelModel = require('../models/config.js')

module.exports = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    const channelID = interaction.channel.id
    
    const channelInteraction = await channelModel.findOne({ guildChannelId: channelID.toString()})

    if(channelInteraction !== null) {
        if(channelInteraction.guildChannelId === channelID.toString()) return;
    }

    try {
        await command.run(client, interaction)
    } catch (e) {
        console.error(e)
    }
}