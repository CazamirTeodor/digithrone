const express = require('express');
const router = express.Router();

const sync_route = require("./sync");
const stats_route = require("./stats");
const delete_route = require("./delete-data");
const request_route = require("./request");
const report_route = require("./report"); 
const cancel_report_route = require("./cancel-report");

router.use("/sync", sync_route);
router.use("/stats", stats_route);
router.use("/delete-data", delete_route);
router.use("/request", request_route);
router.use("/report", report_route);
router.use("/cancel-report", cancel_report_route);


module.exports = router;