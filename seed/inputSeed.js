require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const Users = require("../models/User.model.js")
const Moods = require("../models/Mood.model.js")
const Ingredients = require("../models/Ingredient.model.js")
const Symptoms = require("../models/Symptom.model.js")
const Input = require("../models/Input.model.js")


async function seed() {
  try {
    await Input.deleteMany()
    const findUsers = await Users.find();
    const findMoods = await Moods.find();
    const findIngredients = await Ingredients.find();
    const findSymptoms = await Symptoms.find();

    for (let i = 0; i < 2; i++) {
      const createdInputs = await Input.create({
        user: findUsers[Math.floor(Math.random() * findUsers.length)]._id,
        mood: [findMoods[Math.floor(Math.random() * findMoods.length)]._id],
        ingredient: [findIngredients[Math.floor(Math.random() * findIngredients.length)]._id],
        symptom: [findSymptoms[Math.floor(Math.random() * findSymptoms.length)]._id],

      });
    }
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seed()
