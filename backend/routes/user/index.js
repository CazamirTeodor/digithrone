const express = require('express');
const router = express.Router();

const prefs_route = require("./prefs");
const sync_route = require("./sync");

router.use("/prefs", prefs_route);
router.use("/sync", sync_route);


module.exports = router;