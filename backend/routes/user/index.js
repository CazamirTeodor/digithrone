const express = require('express');
const router = express.Router();

const login_route = require("./login");


router.use("/login", login_route);
//router.use("/cookies", cookies_router);


module.exports = router;