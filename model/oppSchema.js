const mongoose = require("mongoose");

const oppSchema = new mongoose.Schema({
  nameOfStudent: {
    type: String,
  },
  branch: {
    type: String,
  },
  cvLink: {
    type: String,
  },
  message: {
    type: String,
  },
  dateOfNews: {
    type: Date,
    default: Date.now(),
  },
});

const Opps = mongoose.model("Opps", oppSchema);

module.exports = { Opps };
