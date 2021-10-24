const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commands = new Schema({
  userId: String,  
  cookieReceived: Number,
  cookieGiven: Number
});
module.exports = mongoose.model("Commands", commands);