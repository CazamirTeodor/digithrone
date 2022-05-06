// Updates obfuscated websites, blacklisted websites
// and other extension specific data

const express = require("express");
const router = express.Router();
const db = require("../middlewares/database");

router.post("/", (req, res) => {
  //console.log("Heartbeat!");

  res.send({
    obfuscated: Object.keys(db.getObfuscated()),
  });
});

module.exports = router;
