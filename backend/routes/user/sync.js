const express = require('express');
const router = express.Router();
const {synchronizeUser} = require('../../middlewares/database');


router.post("/", async (req, res) => {
    const user = res.locals.user;
    console.log("Accessed /sync route");
    await synchronizeUser(user, req.body);
    res.send({status: `Synchronized`})

});


module.exports = router;
