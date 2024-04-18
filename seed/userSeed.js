require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const User = require("../models/User.model.js")

const password = "123";

const users = [
  {
    name: "Gwen",
    email: "gwen@example.com",
    password: password,
  },
  {
    name: "Lila",
    email: "lila@example.com",
    password: password,
  },
];


async function seed() {
  try {
    await User.deleteMany()
    const createdUsers = await User.create(users);
    console.log(`${createdUsers.length} users created`);
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seed()
