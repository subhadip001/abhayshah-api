const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  profession: {
    type: String,
  },
  areaOfInterest: {
    type: String,
  },
  photo: {
    type: String,
  },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = { UserDetails };
