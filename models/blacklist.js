const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blacklist = new Schema({
  userId: String,
});
module.exports = mongoose.model("Blacklist", blacklist);