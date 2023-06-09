const express = require("express");
const cors = require("cors");
const app = express();
require("./config/database");
require("dotenv").config();

const allowedOrigins = [
  "https://abhayshah-6ive.vercel.app",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { User } = require("./model/usersSchema");
const usersRouter = require("./routes/users");
const userDetailsRouter = require("./routes/userDetailsRouter");
const problemRouter = require("./routes/problemsRoute");
const newsRouter = require("./routes/newsRouter");
const eventRouter = require("./routes/eventsRouter");
const oppRouter = require("./routes/oppRouter");

app.use("/abhay/", usersRouter);
app.use("/abhay/", userDetailsRouter);
app.use("/abhay/", problemRouter);
app.use("/abhay/", newsRouter);
app.use("/abhay/", eventRouter);
app.use("/abhay/", oppRouter);

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
  );
}

module.exports = app;
