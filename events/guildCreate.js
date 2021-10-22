const Discord = require("discord.js");
require('dotenv').config()
const guilds = require('../models/guilds.js')

const guildAddWebhookID = process.env.guildAddWebhookID
const guildAddWebhookToken = process.env.guildAddWebhookToken

const webhookClient = new Discord.WebhookClient({
  id: guildAddWebhookID,
  token: guildAddWebhookToken
});

module.exports = {
    name: 'guildCreate',
    async execute(client, guild) {
      const guildModel = await guilds.findOne({ guildId: guild.id, guildName: guild.name })

    if(guildModel === null){
    const newGuild = new guilds({
        guildId: guild.id.toString(),
        guildName: guild.name.toString(),
        ownerId:guild.ownerId.toString(),
        memberCount: guild.memberCount.toString(),
    })
    newGuild.save().catch(e => console.log(e))
}
    if (guild.memberCount > 1000) {
      webhookClient.send(
        `Se ha añadido una nueva Guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}** Dueño: **${guild.owner}**`
      );
    } else {
      webhookClient.send(
        `Se ha añadido una nueva Guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}** Dueño: **${guild.owner}**`
      );
    }
  }
}