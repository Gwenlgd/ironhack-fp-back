const { Schema, model } = require("mongoose");

const symptomSchema = new Schema({
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

const Symptom = model("Symptom", symptomSchema);

module.exports = Symptom;
