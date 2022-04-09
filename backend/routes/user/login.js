// Logs in an user and sends its data to the extension

const express = require("express");
const crypto = require("crypto");
const auth = require("../../middlewares/auth");
const database = require("../../middlewares/database");
const router = express.Router();
const cors = require("cors");
const corsOptions = {
  origin: "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp",
  credentials: true,
};

router.post("/", cors(corsOptions), async (req, res) => {
  console.log("req :>> ", req);
  const email = req.body.email;
  const hashed_password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  if (await auth.authenticate(email, hashed_password)) {
    // Attach user data
    var data = database.getUser(email);
    delete data.pass;

    // Attach extension specific data
    data.blacklist = {};
    data.blacklist.urls = Object.keys(database.getBlacklist().urls);
    data.obfuscated = Object.keys(database.getObfuscated());

    console.log("Login tried!");
    res.header("Access-Control-Expose-Headers", "Set-Cookie");
    res.cookie("digithrone-auth-cookie", "user_id", {
      expires: new Date(new Date().getTime() + 86409000),
    });
    res.send({
      message: "Success!",
      data: data,
    });
    //console.log('res :>> ', res);
  } else res.send({ message: "Wrong username or password!" });
});

module.exports = router;
