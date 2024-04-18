const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String
  },
  benefits: [{ title: String, description: String }]
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
