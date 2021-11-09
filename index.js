const { ShardingManager } = require('discord.js');
require('dotenv').config()

const manager = new ShardingManager('./bot.js', { 
    token: process.env.token,
    totalShards: "auto",
    shardList: "auto",
    mode: `process`,
    respawn: true,
});

manager.on('shardCreate', async (shard) => {
  console.log(`Iniciando shard #${shard.id + 1}`)
  shard.on('error', (error) => {
    console.error(error)
  })
})
  
manager.spawn();