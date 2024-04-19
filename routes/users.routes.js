const router = require("express").Router();
const User = require("./../models/User.model");


// !! DELETE THIS ROUTE ?
// !! delete & edit users ?

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
