require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const dataMoods = require("../db/moodsdata.json")
const Mood = require("../models/Mood.model.js")

async function seed() {
  try {
    await Mood.deleteMany()
    const createdMoods = await Mood.create(dataMoods)
    console.log(`${createdMoods.length} moods created`);

  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seed()
