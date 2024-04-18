const router = require("express").Router()
const Mood = require("./../models/Mood.model")


// http://localhost:5005/api/moods
router.get("/", async (req, res, next) => {
  try {
    const search = generateSearch(req.query);
    let offset = 0;

    if (req.query.offset) {
      offset = Number(req.query.offset);
    }

    const allMoods = await Mood.find(search)
      .limit(50)
      .skip(offset);
    console.log(allMoods)
    res.json(allMoods);
  } catch (error) {
    next(error);
  }
});

const generateSearch = (query) => {
  const search = {};

  if (query.name) {
    search.name = new RegExp(query.name, "i");
  }
  return search;
};

module.exports = router
