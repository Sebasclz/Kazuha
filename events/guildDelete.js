const Discord = require("discord.js");
require('dotenv').config()
const guilds = require('../models/guilds.js')

const guildDeleteWebhookID = process.env.guildDeleteWebhookID
const guildDeleteWebhookToken = process.env.guildDeleteWebhookToken

const webhookClient = new Discord.WebhookClient({
  id: guildDeleteWebhookID,
  token: guildDeleteWebhookToken
});

module.exports = {
    name: 'guildDelete',
    async execute(client, guild) {
      const guildModel = await guilds.findOne({ guildId: guild.id, guildName: guild.name })

    if(guildModel){
    await guilds.deleteOne({
      guildId: guild.id.toString(),
      guildName: guild.name.toString(),
    })
}
      webhookClient.send(
        `Se ha eliminado una guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}** Dueño: **${guild.ownerId}**`
      );
    }
  }