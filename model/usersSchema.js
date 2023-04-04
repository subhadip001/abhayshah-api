const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// console.log(user.methods);
const User = mongoose.model("User", user);
module.exports = { User };
