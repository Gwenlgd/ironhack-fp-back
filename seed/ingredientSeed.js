require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const dataIngredients = require("../db/ingredientsdata.json")
const ingredients = require("../models/Ingredient.model.js")

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

console.log(dataIngredients[0])

async function seed() {
  try {
    await ingredients.deleteMany()
    await ingredients.create(dataIngredients)

  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}
seed()
