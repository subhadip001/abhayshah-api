const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  answer: {
    type: String,
    ref : "Problem"
  },
  author: {
    fullname: {
      type: String,
    },
    username: {
      type: String,
    },
  },
});

const problemSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  dateOfPosting: {
    type: Date,
  },
  author: {
    username: {
      type: String,
    },
  },
  solution: [solutionSchema],
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = { Problem };
