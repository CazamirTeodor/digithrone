const express = require('express');
const router = express.Router();

const sync_route = require("./sync");
const stats_route = require("./stats");

router.use("/sync", sync_route);
router.use("/stats", stats_route);


module.exports = router;