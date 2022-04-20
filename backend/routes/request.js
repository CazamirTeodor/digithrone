const express = require("express");
const db = require("../middlewares/database");
const url_parser = require("url");
const router = express.Router();

router.post("/", (req, res) => {
  var parts = url_parser.parse(req.body.url);
  console.log(parts);
  const blacklist = db.getBlacklist();
  const urls = Object.keys(blacklist.urls);
  const reports = blacklist.reports;

  // Website is blacklisted
  for (var url of urls) {
    if (parts.hostname.includes(url) || parts.href.includes(url)) {
      res.send({ status: "Deny" });
      return;
    }
  }

  // User has reported the website
  for (var url of Object.keys(reports)) {
    if (parts.hostname.includes(url) || parts.href.includes(url)) {
      for (const report of reports[url]) {
        if (report.reporter == res.locals.user) {
          res.send({ status: "Deny" });
          return;
        }
      }
    }
  }

  res.send({ status: "Allow" });
});

module.exports = router;
