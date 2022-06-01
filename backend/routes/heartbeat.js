// Updates obfuscated websites, blacklisted websites
// and other extension specific data

const express = require("express");
const router = express.Router();
const db = require("../middlewares/database");

router.post("/", (req, res) => {
  res.send({
    message: "I'm fine :)",
  });
});

module.exports = router;
