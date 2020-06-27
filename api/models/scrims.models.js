const mongoose = require("mongoose");

const ScrimSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  found: {
    type: Boolean,
    required: true,
    default: false,
  },
  elo: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Scrim", ScrimSchema);
