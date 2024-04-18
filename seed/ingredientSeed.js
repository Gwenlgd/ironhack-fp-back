require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const dataIngredients = require("../db/ingredientsdata.json")
const Ingredient = require("../models/Ingredient.model.js")

dataIngredients.forEach(ingredient => {
  const matrice = Object.entries(ingredient.benefits)
  ingredient.benefits = matrice.map(row => {
    return {
      title: row[0],
      description: row[1]
    }
  })
  delete ingredient.id
})

async function seed() {
  try {
    await Ingredient.deleteMany()
    const createdIngredients = await Ingredient.create(dataIngredients)
    console.log(`${createdIngredients.length} ingredients created`);

  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}
seed()
