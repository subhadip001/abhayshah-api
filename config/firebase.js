const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey-abhay-sah.json");
require("dotenv").config({ path: "config/config.env" });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

module.exports = admin;
