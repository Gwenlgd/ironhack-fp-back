const router = require("express").Router()
const Input = require("./../models/Input.model")
const Auth = require("../middlewares/isAuthenticated.js")

// Add inputs of the day, and filter by date
// http://localhost:5005/api/inputs
//ALL INPUTS
router.get("/", Auth, async (req, res, next) => {
  try {
    const search = generateSearch(req.query, req.currentUserId);
    let offset = 0;

    if (req.query.offset) {
      offset = Number(req.query.offset);
    }

    const allInputs = await Input.find(search).populate("user date ingredient mood symptom")
      .limit(50)
      .skip(offset);
    res.json(allInputs);
  } catch (error) {
    next(error);
  }
});

// ONE INPUT

router.get("/:inputId", Auth, async (req, res, next) => {
  try {
    const input = await Input.findOne({ _id: req.params.inputId, user: req.currentUserId }).populate("user date ingredient mood symptom");
    if (!input) {
      return res.status(404).json({ message: "Input not found or access denied" });
    }
    res.json(input);
  } catch (error) {
    next(error);

  }
})

router.post("/upsert", Auth, async (req, res, next) => {
  const { date, ingredients, moods, symptoms } = req.body;
  const userId = req.currentUserId;

  try {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const input = await Input.findOneAndUpdate(
      {
        user: userId,
        date: startOfDay
      },
      {
        $setOnInsert: { user: userId, date: startOfDay },
        $addToSet: {
          ingredient: { $each: ingredients },
          mood: { $each: moods },
          symptom: { $each: symptoms }
        }
      },
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).json(input);
  } catch (error) {
    if (error.code === 11000) {
      // !! in case of double input for same date
      return res.status(409).json({ message: "An input already exists for this date. Please update the existing input instead." });
    }
    console.error("Error upserting input:", error);
    res.status(500).send("Failed to upsert input");
  }
});

// Delete an input
router.delete("/:id", Auth, async (req, res, next) => {
  try {
    const inputId = req.params.id;
    await Input.findOneAndDelete({ _id: inputId, user: req.currentUserId });
    res.json({ message: "Input deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Update an input
router.put("/:id", Auth, async (req, res, next) => {
  try {
    const inputId = req.params.id;
    const updatedInput = req.body;
    const result = await Input.findOneAndUpdate(
      { _id: inputId, user: req.currentUserId },
      updatedInput,
      { new: true }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});



// Delete a specific ingredient from an input
router.delete("/:inputId/ingredient/:ingredientId", Auth, async (req, res, next) => {
  try {
    const { inputId, ingredientId } = req.params;
    const updatedInput = await Input.findOneAndUpdate(
      { _id: inputId, user: req.currentUserId },
      { $pull: { ingredient: ingredientId } },
    );
    if (!updatedInput) {
      return res.status(404).json({ message: "Input not found or access denied" });
    }
    res.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    next(error);
  }
});


// Delete a specific mood from an input
router.delete("/:inputId/mood/:moodId", Auth, async (req, res, next) => {
  try {
    const { inputId, moodId } = req.params;
    await Input.findOneAndUpdate(
      { _id: inputId, user: req.currentUserId },
      { $pull: { mood: moodId } }
    );
    res.json({ message: "Mood deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Delete a specific symptom from an input
router.delete("/:inputId/symptom/:symptomId", Auth, async (req, res, next) => {
  try {
    const { inputId, symptomId } = req.params;
    await Input.findOneAndUpdate(
      { _id: inputId, user: req.currentUserId },
      { $pull: { symptom: symptomId } }
    );
    res.json({ message: "Symptom deleted successfully" });
  } catch (error) {
    next(error);
  }
});


const generateSearch = (query, id) => {
  const search = { user: id };

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
