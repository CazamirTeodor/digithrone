// Logs in an user and sends its data to the extension

const express = require("express");
const crypto = require("crypto");
const {
  validateCredentials,
  generateSession,
  getBlacklist,
  getObfuscated,
  getUser,
} = require("../middlewares/database");
const router = express.Router();
const cors = require("cors");
const corsOptions = {
  //origin: "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp",
  credentials: true,
};

router.post("/", cors(corsOptions), async (req, res) => {
  let email = req.body?.email;
  let password = req.body?.password;

  if (!email || !password) {
    res.send({ message: "Missing credentials!" });
  } else {
    const hashed_password = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (await validateCredentials(email, hashed_password)) {
      const session = await generateSession(email);
      const session_cookie = Buffer.from(email + ":" + session).toString(
        "base64"
      );

      const user = await getUser(email);
      res.cookie("digithrone-session-cookie", session_cookie, {
        expires: 0, // Make it a session cookie
      });

      const blacklist = await getBlacklist();
      const blacklist_urls = Object.keys(blacklist.urls);
      const obfuscated_urls = [];
      const websites = await getObfuscated();
      websites.forEach((website) => {
        obfuscated_urls.push(website.url);
      });
      res.send({
        message: "Success!",
        name: user.name,
        prefferences: user.prefferences,
        blacklist: { urls: blacklist_urls },
        obfuscated: obfuscated_urls,
      });
    } else {
      res.send({ message: "Incorrect credentials!" });
    }
  }
});

module.exports = router;
