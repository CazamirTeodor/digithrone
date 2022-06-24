// Reports a page as being malicious

const express = require('express');
const { cancelReport } = require('../middlewares/database');
const router = express.Router();

router.post('/',  async (req, res) => {
    await cancelReport(res.locals.user, req.body.domain);
    res.send({status: "Ok!"});
});

module.exports = router;