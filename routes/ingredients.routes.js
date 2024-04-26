const router = require("express").Router()
const Ingredient = require("./../models/Ingredient.model")
const Input = require('./../models/Input.model');
const Auth = require("../middlewares/isAuthenticated.js")


// http://localhost:5005/api/ingredients

// ALL
router.get("/", async (req, res, next) => {
  try {
    const search = generateSearch(req.query);
    let offset = 0;

    if (req.query.offset) {
      offset = Number(req.query.offset);
    }

    const allIngredients = await Ingredient.find(search)
      .skip(offset);
    res.json(allIngredients);
  } catch (error) {
    next(error);
  }
});

// Get one

router.get("/:ingredientId", async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findOne({ _id: req.params.ingredientId });
    if (!ingredient) {
      return res.status(400).json({ message: "ingredient not found or access denied" });
    }
    res.json(ingredient);
  } catch (error) {
    next(error);

  }
})
// router.get("/:ingredientId", Auth, async (req, res, next) => {
//   try {
//     const ingredient = await Ingredient.findOne({ _id: req.params.ingredientId });
//     if (!ingredient) {
//       return res.status(400).json({ message: "ingredient not found or access denied" });
//     }
//     res.json(ingredient);
//   } catch (error) {
//     next(error);

//   }
// })

// Delete on ingredient inside an input
//!! not working?

// router.delete("/inputs/:inputId/ingredients/:ingredientId", Auth, async (req, res, next) => {
router.delete("/inputs/:inputId/ingredients/:ingredientId", async (req, res, next) => {

  const { inputId, ingredientId } = req.params;
  console.log("inputId and ingredientId:", req.params.inputId, req.params.ingredientId);

  try {
    const updatedInput = await Input.findByIdAndUpdate(
      req.params.inputId,
      { $pull: { ingredients: req.params.ingredientId } },
      { new: true }
    ).populate('ingredients');

    if (!updatedInput) {
      res.status(400).json({ message: "Input not found or Ingredient not in Input" });
    } else {
      res.status(200).json(updatedInput);
    }
  } catch (error) {
    console.error('Error removing ingredient from input:', error);
    res.status(500).send({ message: "Error removing ingredient from input" });
    next(error);
  }
});

const generateSearch = (query) => {
  const search = {};

  if (query.name) {
    search.name = new RegExp(query.name, "i");
  }

  if (query.category) {
    search.category = new RegExp(query.category, "i");
  }

  if (query.benefits) {
    search.$or = [
      { 'benefits.title': new RegExp(query.benefits, "i") }, { 'benefits.description': new RegExp(query.benefits, "i") }
    ]
  }
  console.log(search)
  return search;
};
module.exports = router
