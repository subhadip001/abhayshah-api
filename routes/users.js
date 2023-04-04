const express = require("express");
const router = express.Router();
const { User } = require("../model/usersSchema");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());

// Sign up API endpoint
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password before saving to database
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login API endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, userId: user._id },
      "mysecretkey"
    );

    res.status(200).json({ token: token, username: username });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
