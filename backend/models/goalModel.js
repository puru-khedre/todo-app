const { Schema, model } = require("mongoose");

const goalSchema = Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Goal", goalSchema);
