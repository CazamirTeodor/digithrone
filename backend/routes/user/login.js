// Logs in an user and sends its data to the extension

const express = require('express');
const crypto = require('crypto');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/', async (req, res) => {
    const email = req.body.email;
    const hashed_password = crypto.createHash('sha256').update(req.body.password).digest('hex');

    const data = await auth.authenticate(email, hashed_password)
    if (data)
    {
        // Also send client data to him
        res.send({
            message : 'Success!',
            data : data
        });
    }
    else
        res.send({message: 'Wrong username or password!'});
});

module.exports = router;