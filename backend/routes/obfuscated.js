const express = require('express');
const router = express.Router();
const database = require('../middlewares/database');
const { deobfuscate } = require('../middlewares/deobfuscator');

router.post('/:website*', async (req, res) => {
    let hasCookie = true; // For now

    if (hasCookie) {
        const website = req.params.website;
        const path = req.params[0];

        const obf_websites = database.getObfuscated();
        if (website in obf_websites) {
            const ip = obf_websites[website]['ip'];
            const port = obf_websites[website]['port'];
            //const url = `${ip}:${port}/${path}`;
            //const url = `${ip}/${path}`;
            const url = `https://vercel.com`;

            const python = spawn('python3', ['webpage2html.py', url, '-o', './routes/index.html']);
            python.stdout.on('close', code => {
            console.log("Conversion complete!", code);
            res.sendFile(ph.resolve(ph.join(__dirname, 'index.html')))
            console.log('File sent!')
    });

        }
        else {
            res.send(`${website}/${path} Not a valid website`);
        }
    }
    else {
        parse
        res.send('You are not logged in');
    }

});

router.get('/:website*', (req, res) => {
    res.send('Sterge-ma');
});

module.exports = router;