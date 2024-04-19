const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User.model")
const isAuthenticated = require("../middlewares/isAuthenticated")
// const passport = require("passport")
const SALT = 12

//! we are prefixed with /api/auth

router.post(
  "/signup",
  async (req, res, next) => {
    try {
      console.log(req.body)
      // return res.send("wip")
      const { email, password } = req.body
      // const regex = new RegExp("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$")
      if (!password) {
        return res.status(400).json({ message: "password is required" })
      }
      const foundUser = await User.findOne({ email })
      // if we find someone, warn the user that the email is alrady used
      if (foundUser) {
        return res.status(400).json({ message: "This email is already used" })
      }
      // We should hash the password and create the user

      const hashedPassword = await bcrypt.hash(password, SALT)

      const createdUser = await User.create({
        email,
        password: hashedPassword,
      })

      res.status(201).json({
        message: "User created",
        id: createdUser._id,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email }, { password: 1, email: 1 })

    if (!foundUser) {
      return res.status(400).json({ message: "Wrong credentials" })
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password)

    if (!correctPassword) {
      return res.status(400).json({ message: "Wrong credentials" })
    }

    // Reasonably assume that they are the correct person

    const token = jwt.sign({ id: foundUser._id }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    })
    res.json({ authToken: token })
  } catch (error) {
    next(error)
  }
})

router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUserId)
    console.log(user)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// router.get(
//   "/github",
//   passport.authenticate("github", {
//     scope: ["user"],
//     session: false,
//     passReqToCallback: true,
//   })
// )

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     session: false,
//     passReqToCallback: true,
//   }),
//   function (req, res) {
//     const token = jwt.sign({ id: req.user._id }, process.env.TOKEN_SECRET, {
//       algorithm: "HS256",
//       expiresIn: "7d",
//     })
//     const url = `${process.env.ORIGIN}/callback?token=${token}`
//     res.redirect(url)
//   }
// )

module.exports = router
