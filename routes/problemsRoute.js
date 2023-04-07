const express = require("express");
const router = express.Router();
const { User } = require("../model/usersSchema");
const { Problem } = require("../model/problemSchema");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get("/getProblems", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(201).send(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/postProblems", async (req, res) => {
  const { question, dateOfPosting, authorUsername } = req.body;
  const problem = new Problem({
    question: question,
    dateOfPosting: dateOfPosting,
    author: {
      username: authorUsername,
    },
  });

  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
