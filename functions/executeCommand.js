const blacklist = require('../models/blacklist.js')

module.exports = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

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