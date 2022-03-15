const express = require('express');
const router = express.Router();
const { data_to_b64 } = require('../middlewares/deobfuscator');

router.get('/', (req, res) => {

    var source_url = "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"
    data_to_b64(source_url);
})

module.exports = router;