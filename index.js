const { ShardingManager } = require('discord.js');
require('dotenv').config()

const manager = new ShardingManager('./bot.js', { 
    token: process.env.token
});

manager.on('shardCreate', async (shard) => {
  console.log(`Iniciando shard ${shard.id}`)
  shard.on('error', (error) => {
    console.error(error)
  })
})
  
manager.spawn();