require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const dataSymptoms = require("../db/symptomsdata.json")
const Symptom = require("../models/Symptom.model.js")

async function seed() {
  try {
    await Symptom.deleteMany()
    const createdSymptoms = await Symptom.create(dataSymptoms)
    console.log(`${createdSymptoms.length} symptoms created`);
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seed()
