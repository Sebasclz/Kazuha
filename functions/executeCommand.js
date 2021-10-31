const blacklist = require('../models/blacklist.js')
const channelModel = require('../models/config.js')

module.exports = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    const channelId = interaction.channelId
    const channelID = channelId.toString()
    
    const channelInteraction = await channelModel.findOne({ guildChannelId: `${channelID}`})

    if(channelInteraction !== null) {
        if(channelInteraction.guildChannelId === `${channelID}`) return;
    }

    const userBlacklist = await blacklist.findOne({
        userId: interaction.user.id
    })

    if(userBlacklist) return;

    try {
        await command.run(client, interaction)
    } catch (e) {
        console.error(e)
    }
}