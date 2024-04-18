const router = require("express").Router()
const Symptom = require("./../models/Symptom.model")


// http://localhost:5005/api/symptoms
router.get("/", async (req, res, next) => {
  try {
    const search = generateSearch(req.query);
    let offset = 0;

    if (req.query.offset) {
      offset = Number(req.query.offset);
    }

    const allSymptoms = await Symptom.find(search)
      .limit(50)
      .skip(offset);
    console.log(allSymptoms)
    res.json(allSymptoms);
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

  return search;
};

module.exports = router
