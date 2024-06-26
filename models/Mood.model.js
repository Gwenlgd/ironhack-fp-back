const { Schema, model } = require("mongoose");

const moodSchema = new Schema({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  impact: {
    type: String,
  }
})

const Mood = model("Mood", moodSchema);

module.exports = Mood;
