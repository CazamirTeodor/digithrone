// Logs in an user and sends its data to the extension

const express = require("express");
const crypto = require("crypto");
const database = require("../middlewares/database");
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

    if (database.validateCredentials(email, hashed_password)) {
      const session = database.generateSession(email);
      const session_cookie = Buffer.from(email + ":" + session).toString('base64');


      let user = database.getUser(email);
      res.cookie("digithrone-session-cookie", session_cookie, {
        expires: 0, // Make it a session cookie
      });
      
      res.send({
        message: "Success!",
        name: user.name,
        prefferences: user.prefferences,
        blacklist: { urls: Object.keys(database.getBlacklist().urls) },
        obfuscated: Object.keys(database.getObfuscated()),
      });
    } else {
      res.send({ message: "Incorrect credentials!" });
    }
  }
});

module.exports = router;
