const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guilds = new Schema({
  guildId: String,
  guildName: String,
  ownerId: String,
  memberCount: String,
});
module.exports = mongoose.model("Guilds", guilds);