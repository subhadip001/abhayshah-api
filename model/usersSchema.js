const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  about: {
    type: String,
  },
  areaOfInterest: {
    type: String,
  },
  photo: {
    type: String,
  },
});

// console.log(user.methods);
const User = mongoose.model("User", user);
module.exports = { User };
