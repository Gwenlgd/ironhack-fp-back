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
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)


const Input = model("Input", inputSchema);

module.exports = Input;
