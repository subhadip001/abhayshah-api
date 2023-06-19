const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { Opps } = require("../model/oppSchema");
require("../config/firebase");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "config/config.env" });

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

router.post("/send-email", async (req, res) => {
  try {
    const { fileUrl, recipientEmail } =
      req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    const attachment = {
      path: fileUrl,
    };

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: recipientEmail,
      subject: "New Opportunity Request",
      text: "Please find the attachment.",
      attachments: [attachment],
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("An error occurred while sending the email");
  }
});

module.exports = router;
