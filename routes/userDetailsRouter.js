const express = require("express");
const { User } = require("../model/usersSchema");
const router = express.Router();

// Get all user details
router.get("/userdetails", async (req, res) => {
  try {
    const userDetails = await User.find();
    console.log(userDetails);
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/userdetails/:id", async (req, res) => {
  const params = req.params;
  console.log(params);
  try {
    const userDetails = await User.findOne({ username: params.id });
    console.log(userDetails);
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user's details by their user ID
router.get("/userdetails/:userId", async (req, res) => {
  try {
    const userDetails = await User.findOne({
      userId: req.params.userId,
    });
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user's details
router.post("/userdetails", async (req, res) => {
  const userDetails = new User({
    userId: req.body.userId,
    fullName: req.body.fullName,
    photo: req.body.photo,
    profession: req.body.profession,
    areaOfInterest: req.body.areaOfInterest,
  });

  try {
    const newUserDetails = await userDetails.save();
    res.status(201).json(newUserDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
