require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const dataMoods = require("../db/moodsdata.json")
const moods = require("../models/Mood.model.js")

async function seed() {
  try {
    await moods.deleteMany()
    await moods.create(dataMoods)

  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seed()
