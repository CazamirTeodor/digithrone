const express = require('express');
const crypto = require('crypto');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const hashed_password = crypto.createHash('sha256').update(password).digest('hex');
    console.log(`Hashed password is ${hashed_password}`)
    res.send({message : 'Success!'});
});

module.exports = router;