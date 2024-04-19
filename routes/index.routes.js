// routes/- the folder where all your different route files will be.
const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes.js"))

router.use("/ingredients", require("./ingredients.routes.js"))
router.use("/moods", require("./moods.routes.js"))
router.use("/symptoms", require("./symptoms.route.js"))
router.use("/users", require("./users.routes.js"))
router.use("/inputs", require("./inputs.routes.js"))

module.exports = router;
