const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  photo: {
    type: String,
  },
  dateOfPosting: {
    type: String,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = { News };
