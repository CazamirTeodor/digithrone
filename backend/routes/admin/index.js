const express = require('express');
const router = express.Router();

const create_user_route = require("./create-user");
const delete_user_route = require("./delete-user");
const get_reports_route = require("./get-reports");

router.use("/create-user", create_user_route);
router.use("/delete-user", delete_user_route);
router.use("/get-reports", get_reports_route);


module.exports = router;