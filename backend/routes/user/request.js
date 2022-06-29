const express = require("express");
const {
  getCookies,
  synchronizeUser,
  getUser,
  isBlacklisted,
  isReported,
  addBlockedVisit,
} = require("../../middlewares/database");
const url_parser = require("url");
const sslCertificate = require("get-ssl-certificate");
const { validateSSL } = require("ssl-validator");
const router = express.Router();
const { getResponseDetails } = require("../../middlewares/response-detailer");

router.post("/", async (req, res) => {
  var parts = url_parser.parse(req.body.url);
  console.log("Request made to ", parts.href.slice(0, 20));
  await synchronizeUser(res.locals.user, req.body.sync_data);

  if (parts.href.match(/^https?:\/\/localhost/)) {
    res.send({ status: "Allow" });
    return;
  }

  // Check if domain is blacklisted
  const domain = parts.hostname
    .replace("^www", "")
    .split(".")
    .slice(-2)
    .join(".");
  if (await isBlacklisted(domain)) {
    await addBlockedVisit(res.locals.user, req.body.url);
    res.send({ status: "Blacklisted" });
    return;
  }

  // Check if page has already been reported
  // by the user
  if (await isReported(domain, res.locals.user)) {
    await addBlockedVisit(res.locals.user, req.body.url);
    res.send({ status: "Reported" });
    return;
  }

  // Verify that certificate is valid
  const responseInfo = await getResponseDetails(parts.hostname);
  console.log(responseInfo);
  if (!responseInfo.certificateInfo.valid) {
    await addBlockedVisit(res.locals.user, req.body.url);
    console.log("Certificate is not valid!");
    res.send({ status: "Invalid-certificate" });
    return;
  }

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
        res.send({
          status: "Allow",
          cookies: cookies,
          responseInfo: responseInfo,
        });
      } else {
        console.log(
          "Cookies requested for platform",
          platform,
          "but none stored"
        );
        res.send({ status: "Allow", responseInfo: responseInfo, });
      }
    } else {
      console.log("Cookies not requested for platform", platform);
      res.send({ status: "Allow", responseInfo: responseInfo, });
    }
  } else {
    console.log("No cookies requested!", platform);
    res.send({ status: "Allow", responseInfo: responseInfo, });
  }
});

module.exports = router;
