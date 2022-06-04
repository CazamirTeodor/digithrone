const express = require('express');
const router = express.Router();

const sync_route = require("./sync");
const stats_route = require("./stats");
const delete_route = require("./delete");

router.use("/sync", sync_route);
router.use("/stats", stats_route);
router.use("/delete", delete_route);


module.exports = router;