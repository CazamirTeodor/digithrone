const express = require("express");
const { getBlacklist, getCookies, synchronizeUser } = require("../middlewares/database");
const url_parser = require("url");
const router = express.Router();

router.post("/", async (req, res) => {
  var parts = url_parser.parse(req.body.url);
  console.log("Request made to ", parts.href);

  await synchronizeUser(res.locals.user, req.body.sync_data);

  const blacklist = await getBlacklist();
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

  //   // Url is from a obfuscated website
  //   const obfuscated = db.getObfuscated();
  //   for (var url of Object.keys(obfuscated)) {
  //     if (parts.hostname == url) {
  //       res.send({ status: "Obfuscated" });
  //       return;
  //     }
  //   }

  var platform;
  var hostname = parts.hostname;
  let hostname_fields = hostname.split(".");
  if (hostname_fields.slice(-2).join(".") === "co.uk") {
    platform = hostname_fields[hostname_fields.length - 3];
  } else {
    platform = hostname_fields[hostname_fields.length - 2];
  }

  const cookies = await getCookies(res.locals.user, platform);
  if (cookies && cookies.length) {
    console.log("Sent", cookies.length, "cookies for platform ", platform);
    res.send({ status: "Allow", cookies: cookies });
  } else 
    res.send({ status: "Allow" });
});

module.exports = router;
