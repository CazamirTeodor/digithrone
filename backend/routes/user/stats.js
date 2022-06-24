const express = require("express");
const router = express.Router();
const { getUser } = require("../../middlewares/database");

router.post("/", async (req, res) => {
  let user = await getUser(res.locals.user);
  var data = user.data;

  // Replace cookies data with cookies length
  // because this is what we want to send to the client
  for (let platform of Object.keys(user.data.cookies)) {
    const length = user.data.cookies[platform].length;

    if (length > 0) {
      const domain = user.data.cookies[platform][0].domain;
      data.cookies[platform] = {};
      data.cookies[platform].count = length;
      data.cookies[platform].domain = domain;
    } else delete data.cookies[platform];
  }

  console.log("Returning stats for user", res.locals.user);
  res.send({ data });
});

module.exports = router;
