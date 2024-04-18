const router = require("express").Router()
const Ingredient = require("./../models/Ingredient.model")


// http://localhost:5005/api/ingredients
router.get("/", async (req, res, next) => {
  try {
    const search = generateSearch(req.query);
    let offset = 0;

    if (req.query.offset) {
      offset = Number(req.query.offset);
    }

    const allIngredients = await Ingredient.find(search)
      .limit(50)
      .skip(offset);
    res.json(allIngredients);
  } catch (error) {
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
