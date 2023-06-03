const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { Opps } = require("../model/oppSchema");

router.use(bodyParser.json());

router.post("/getAllOppsReqs", async (req, res) => {
  const { username } = req.body;
  if (username !== "admin") {
    res.status(401).json({ message: "Not Authorised" });
    return;
  }
  try {
    const oppsReqsList = await Opps.find();
    res.status(201).json(oppsReqsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/postOppRequest", async (req, res) => {
  const { nameOfStudent, branch, cvLink, message } = req.body;

  const oppReq = new Opps({
    nameOfStudent,
    branch,
    cvLink,
    message,
  });

  try {
    const newOppReq = await oppReq.save();
    console.log(newOppReq);
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

module.exports = router;
