const blacklist = require('../models/blacklist.js')

module.exports = async (client, interaction) => {
    const commandName = interaction.message.interaction.commandName
    const selectMenuId = interaction.customId
    const selectMenu = client.selectMenus.get(selectMenuId)

    if (!selectMenu) return

    const userBlacklist = await blacklist.findOne({
        userId: interaction.user.id
    })

    if(userBlacklist) return;

    try {
        await selectMenu.run(client, interaction)
    } catch (e) {
        console.error(e)
    }
}