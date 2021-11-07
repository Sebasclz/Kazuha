const mongoose = require("mongoose")
require('dotenv').config()
const Discord = require('discord.js')
const botReadyWebhookID = process.env.botReadyWebhookID
const botReadyWebhookToken = process.env.botReadyWebhookToken

const webhookClient = new Discord.WebhookClient({
	id: botReadyWebhookID,
	token: botReadyWebhookToken
  });

module.exports = {
	name: 'ready',
	execute(client) {
		mongoose.connect(process.env.mongoURL,{
			useNewUrlParser: true,
			useUnifiedTopology: true, 
		})
		console.log('La base de datos y la aplicacion han sido iniciadas correctamente')
		//webhookClient.send(
		//	`${client.user.username} se ha iniciado/reconectado correctamente y sin fallos aparentemente.`
		 // );
	}
}