const express = require("express");
const router = express.Router();
const { getUser, getDatabase } = require("../../middlewares/database");

router.post("/", async (req, res) => {
  let user = await getUser(res.locals.user);

  console.log(
    "Deleting ",
    res.locals.user,
    "'s cookies for platforms ",
    req.body.platforms
  );
  for (let platform of req.body.platforms) {
    user.data.cookies[platform] = [];
  }

  const database = await getDatabase();
  await database
    .collection("users")
    .replaceOne({ email: res.locals.user }, user);

  console.log(user.data);
  res.send({ message: "Deleted!" });
});

module.exports = router;
