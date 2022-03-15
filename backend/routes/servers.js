const express = require('express');
const router = express.Router();
const db = require('../middlewares/database');

router.get('/', (req, res) => {
    const servers  = db.get()['servers'];
    console.log("Sent server list!");
    res.send({'servers' : servers});

});


module.exports = router;