const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  photoLink: {
    type: String,
  },
  dateOfNews: {
    type: Date,
    default: Date.now(),
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = { News };
