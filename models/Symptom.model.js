const { Schema, model } = require("mongoose");

const symptomSchema = new Schema({
  name: {
    type: String,
  }
})

const Symptom = model("Symptom", symptomSchema);

module.exports = Symptom;
