// Logs in an user and sends its data to the extension

const express = require('express');
const crypto = require('crypto');
const auth = require('../../middlewares/auth');
const database = require('../../middlewares/database');
const router = express.Router();

router.post('/', async (req, res) => {
    const email = req.body.email;
    const hashed_password = crypto.createHash('sha256').update(req.body.password).digest('hex');


    if (await auth.authenticate(email, hashed_password))
    {
        // Attach user data
        var data = database.getUser(email);
        delete data.pass;

        // Attach extension specific data
        data.blacklist = database.getBlacklist();
        data.obfuscated = Object.keys(database.getObfuscated());

        res.send({
            message : 'Success!',
            data : data
        });
    }
    else
        res.send({message: 'Wrong username or password!'});
});

module.exports = router;