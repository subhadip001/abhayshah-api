const express = require("express");
const router = express.Router();
const { User } = require("../model/usersSchema");
const bodyParser = require("body-parser");
const { News } = require("../model/newsSchema");

router.use(bodyParser.json());

router.get("/getTodaysNews", async (req, res) => {
  try {
    const newsList = await News.find({ dateOfNews: Date.now() });
    res.status(201).json(newsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/getAllNews", async (req, res) => {
  try {
    const newsList = await News.find();
    res.status(201).json(newsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/postNews", async (req, res) => {
  const { username, title, desc, photoLink } = req.body;
  if (username !== "admin") {
    res.status(401).json({ message: "Request Not Authorized" });
    return;
  }

  const news = new News({
    title,
    desc,
    photoLink,
  });

  try {
    const newNews = await news.save();
    console.log(newNews);
    res
      .status(201)
      .json({ message: "News posted Successfully", data: newNews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
