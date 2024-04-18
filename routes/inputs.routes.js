const router = require("express").Router()
const Input = require("./../models/Input.model")

// Add inputs of the day, and filter by date
// http://localhost:5005/api/inputs
router.get("/", async (req, res, next) => {
  try {
    const search = generateSearch(req.query);
    let offset = 0;

    if (req.query.offset) {
      offset = Number(req.query.offset);
    }

    const allInputs = await Input.find(search)
      .limit(50)
      .skip(offset);
    res.json(allInputs);
  } catch (error) {
    next(error);
  }
});

const generateSearch = (query) => {
  const search = {};

  // !! by date? CHECK PAS SURE
  if (query.
    createdAt) {
    search.createdAt = new Date(query.createdAt);
  }

  // if (query.category) {
  //   search.category = new RegExp(query.category, "i");
  // }

  // if (query.benefits) {
  //   search.$or = [
  //     { 'benefits.title': new RegExp(query.benefits, "i") }, { 'benefits.description': new RegExp(query.benefits, "i") }
  //   ]
  // }
  console.log(search)
  return search;
};
module.exports = router
