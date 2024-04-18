require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const Input = require("../models/Input.model.js")

const password = "123";

const inputs = [
  {
    user: "66212e1d6aebf96c252b475b",
    ingredient: "66212e1d83b0efd509efbeb2",
    mood: "66212e1d6eacaa27f08ce75d",
    symptom: "66212e1d45e80f05f6e98371",
    timestamps: Date.now(),
  },
  {
    user: "66213943e0c9d77d0a79238d",
    ingredient: "6621394287b6540ca552a50b",
    mood: "66213943054bd989402625df",
    symptom: "662139436603855760d0cb49",
    timestamps: Date.now(),
  },
];


async function seed() {
  try {
    await Input.deleteMany()
    const createdInputs = await Input.create(inputs);
    console.log(`${createdInputs.length} inputs created`);
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seed()
