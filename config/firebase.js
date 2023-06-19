const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey-abhay-sah.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://abheyshahpersonalproject-default-rtdb.firebaseio.com",
});

module.exports = admin;
