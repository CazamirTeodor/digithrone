const express = require('express');
const router = express.Router();
const db = require('../../middlewares/database');


router.post("/prefs", (req, res) => {
    const user = db.getUser(cookie)
});


module.exports = router;

