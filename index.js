const { ShardingManager } = require('discord.js');
const config = require('./config.json')

const manager = new ShardingManager('./bot.js', { 
    token: config.token
});

manager.on('shardCreate', async (shard) => {
  console.log(`Iniciando shard ${shard.id}`)
  shard.on('error', (error) => {
    console.error(error)
  })
})
  
manager.spawn();