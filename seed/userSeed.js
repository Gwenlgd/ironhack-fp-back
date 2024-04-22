require('dotenv').config({ path: "./../.env" })
require("../db/index.js")
const bcrypt = require("bcryptjs")
const User = require("../models/User.model.js")
const SALT = 12

// change
const password = bcrypt.hashSync("1234", SALT);

const users = [
  {
    name: "Gwen",
    email: "gwen@example.com",
    password: password,
  },
  {
    name: "Alix",
    email: "alix@example.com",
    password: password,
  },
  {
    name: "Claire",
    email: "claire@example.com",
    password: password,
  },
  {
    name: "Mathilde",
    email: "mathilde@example.com",
    password: password,
  },
  {
    name: "Feryal",
    email: "feryal@example.com",
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
