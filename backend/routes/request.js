const express = require("express");
const {
  getBlacklist,
  getCookies,
  synchronizeUser,
  getUser,
  getDatabase
} = require("../middlewares/database");
const url_parser = require("url");
const sslCertificate = require("get-ssl-certificate");
const { validateSSL } = require("ssl-validator");
const router = express.Router();
const { checkCertificateValidity } = require("../middlewares/cert-validator");

router.post("/", async (req, res) => {
  var parts = url_parser.parse(req.body.url);
  console.log("Request made to ", parts.href.slice(0, 20));
  await synchronizeUser(res.locals.user, req.body.sync_data);

  if (parts.href.match(/^https?:\/\/localhost/)) {
    res.send({ status: "Allow" });
    return;
  }

  const blacklist = await getBlacklist();
  const reports = blacklist.reports;

  // Domain is blacklisted
  for (var domain of blacklist.domains) {
    if (parts.host.indexOf(domain.slice(1)) !== -1) {
      let database = await getDatabase();
      let user = await getUser(res.locals.user);
      user.data.history.browsing.push({
        lastVisitTime: Date.now(),
        url: req.body.url,
        title: "Blocked website",
        canceled: true
      });
      await database.collection("users").replaceOne({ email: res.locals.user }, user);
      res.send({ status: "Blacklisted" });

      return;
    }
  }

  // Verify that certificate is valid
  if (!(await checkCertificateValidity(parts.hostname))) {
    console.log("Certificate is not valid!");
    res.send({ status: "Invalid-certificate" });
    return;
  }

  // User has reported the website
  // for (var url of Object.keys(reports)) {
  //   if (parts.hostname.includes(url) || parts.href.includes(url)) {
  //     for (const report of reports[url]) {
  //       if (report.reporter == res.locals.user) {
  //         res.send({ status: "Reported" });
  //         return;
  //       }
  //     }
  //   }
  // }

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

  platform = platform.charAt(0).toUpperCase() + platform.slice(1);

  // Check if user has cookies activated
  const user = await getUser(res.locals.user);
  if (user.prefferences.cookies.active) {
    if (
      platform in user.prefferences.cookies.platforms &&
      user.prefferences.cookies.platforms[platform].active
    ) {
      const cookies = await getCookies(res.locals.user, platform);
      if (cookies && cookies.length) {
        console.log("Sent", cookies.length, "cookies for platform", platform);
        res.send({ status: "Allow", cookies: cookies });
      } else {
        console.log(
          "Cookies requested for platform",
          platform,
          "but none stored"
        );
        res.send({ status: "Allow" });
      }
    } else {
      console.log("Cookies not requested for platform", platform);
      res.send({ status: "Allow" });
    }
  } else {
    console.log("No cookies requested!", platform);
    res.send({ status: "Allow" });
  }
});

module.exports = router;
