const Discord = require("discord.js");
require('dotenv').config()
const guildDeleteWebhookID = process.env.guildDeleteWebhookID
const guildDeleteWebhookToken = process.env.guildDeleteWebhookToken

const webhookClient = new Discord.WebhookClient({
  id: guildDeleteWebhookID,
  token: guildDeleteWebhookToken
});

module.exports = {
    name: 'guildDelete',
    async execute(client, guild) {
      webhookClient.send(
        `Se ha eliminado una guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}** Dueño: **${guild.ownerId}**`
      );
    }
  }