const express = require('express');
const router = express.Router();
const db = require('../../middlewares/database');


router.post("/", (req, res) => {
    console.log("You are authorized!");
    const user = res.locals.user;
    res.send({message: `Request made by ${user}`})
});


module.exports = router;

