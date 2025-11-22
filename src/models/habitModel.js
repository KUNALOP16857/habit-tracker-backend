const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

habitSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
