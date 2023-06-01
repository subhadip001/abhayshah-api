const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  eventDate: {
    type: String,
  },
  dateOfPosting: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
