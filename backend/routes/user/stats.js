const express = require("express");
const router = express.Router();
const { getUser } = require("../../middlewares/database");

router.post("/", async (req, res) => {
  let user = await getUser(res.locals.user);
  const data = user.data;
  console.log("Returning stats for user", res.locals.user);
  res.send({ data });
});

module.exports = router;
