const express = require("express");
const router = express.Router();
const { User } = require("../model/usersSchema");
const bodyParser = require("body-parser");
const { Event } = require("../model/eventSchema");

router.use(bodyParser.json());

router.get("/getAllEvents", async (req, res) => {
  try {
    const newsList = await Event.find();
    res.status(201).json(newsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/postEvent", async (req, res) => {
  const { username, title, desc, eventDate } = req.body;
  if (username !== "admin") {
    res.status(401).json({ message: "Request Not Authorized" });
    return;
  }

  const event = new Event({
    title,
    desc,
    eventDate,
  });

  try {
    const newEvent = await event.save();
    res
      .status(201)
      .json({ message: "Event posted Successfully", data: newEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
