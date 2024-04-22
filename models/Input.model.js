const { Schema, model } = require("mongoose");

const inputSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  ingredient: [{
    type: Schema.Types.ObjectId,
    ref: "Ingredient",
  }],
  mood: [{
    type: Schema.Types.ObjectId,
    ref: "Mood",
  }],
  symptom: [{
    type: Schema.Types.ObjectId,
    ref: "Symptom",
  }],

  date: {
    type: Date,
  }
},
  {
    // `createdAt` and `updatedAt`
    timestamps: true,
  }
)


const Input = model("Input", inputSchema);

module.exports = Input;
