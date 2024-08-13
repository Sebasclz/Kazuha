const Discord = require("discord.js");
require('dotenv').config()
const guildAddWebhookID = process.env.guildAddWebhookID
const guildAddWebhookToken = process.env.guildAddWebhookToken

const webhookClient = new Discord.WebhookClient({
  id: guildAddWebhookID,
  token: guildAddWebhookToken
});

module.exports = {
    name: 'guildCreate',
    async execute(client, guild) {
    if (guild.memberCount > 1000) {
      webhookClient.send(
        `Se ha añadido una nueva Guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}** Dueño: **${guild.ownerId} <@419574607020949505>**`
      );
    } else {
      webhookClient.send(
        `Se ha añadido una nueva Guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}** Dueño: **${guild.ownerId}**`
      );
    }
  }
}