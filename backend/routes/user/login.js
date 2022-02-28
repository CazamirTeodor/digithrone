// Logs in an user and sends its data to the extension

const express = require('express');
const crypto = require('crypto');
const auth = require('../../middlewares/auth');
const router = express.Router();
const fs = require('fs');

router.post('/', async (req, res) => {
    const email = req.body.email;
    const hashed_password = crypto.createHash('sha256').update(req.body.password).digest('hex');


    if (await auth.authenticate(email, hashed_password))
    {
        const raw_data = fs.readFileSync('/Users/teodorcazamir/Desktop/digithrone/backend/data/database.json');
        const json_data = JSON.parse(raw_data);

        // Attach user data
        data = json_data['users'][email];
        delete data.pass;

        // Attach extension specific data
        data.blacklist = json_data['blacklist'];
        data.obfuscated_websites = Object.keys(json_data['obfuscated'])

        res.send({
            message : 'Success!',
            data : data
        });
    }
    else
        res.send({message: 'Wrong username or password!'});
});

module.exports = router;