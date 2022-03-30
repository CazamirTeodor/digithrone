const express = require('express');
const router = express.Router();
const database = require('../middlewares/database');
const { deobfuscate } = require('../middlewares/deobfuscator');
const ph = require('path');

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

            /*
            const python = spawn('python3', ['webpage2html.py', url, '-o', './routes/index.html']);
            python.stdout.on('close', code => {
            console.log("Conversion complete!", code);
            res.sendFile(ph.resolve(ph.join(__dirname, 'index.html')))
            console.log('File sent!')
    });
            */
            await new Promise(r => setTimeout(r, 500));
            res.sendFile(ph.resolve(ph.join(__dirname, 'index.html')))

        }
        else {
            res.send(`${website}/${path} Not a valid website`);
        }
    }
    else {
        res.send('You are not logged in');
    }

});

router.get('/:website*', (req, res) => {
    res.sendFile(ph.resolve('./static_pages/loading.html'));
});

module.exports = router;