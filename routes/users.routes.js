const router = require("express").Router();
const User = require("./../models/User.model");


// !! DELETE THIS ROUTE ?
// !! delete & edit users ?

// Create
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body

    const userToCreate = { name, email, password }

    const createdUser = await User.create(userToCreate)
    console.log(createdUser)

    res.status(201).json(createdUser)
  } catch (error) {
    console.log(error)
    res.send("Error in the backend, check the console")
  }
})

// Update
router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params
    const { name, email, password } = req.body
    const newUser = { name, email, password }
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, newUser, {
      new: true,
    })
    res.json(updatedUser)
  } catch (error) {
    console.log(error)
    res.send("Error in the backend, check the console")
  }
})

// Delete
router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params
    await User.findOneAndDelete({ _id: userId })

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.send("Error in the backend, check the console")
  }
})


// http://localhost:5005/api/users

// Get one user
// router.get("/:userId", async (req, res, next) => {
//   try {
//     const oneUser = await User.findById(req.params.userId);
//     res.json(oneUser);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
