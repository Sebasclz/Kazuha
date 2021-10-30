const mongoose = require("mongoose")
require('dotenv').config()

module.exports = {
	name: 'ready',
	execute(client) {
		mongoose.connect(process.env.mongoURL,{
			useNewUrlParser: true,
			useUnifiedTopology: true, 
		})
		console.log('Base de datos y bot iniciados correctamente.')
	}
}