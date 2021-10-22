const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const developer = new Schema({
  developerId: String,
  developerName: String,
});
module.exports = mongoose.model("Developers", developer);