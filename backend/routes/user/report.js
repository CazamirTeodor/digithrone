// Reports a page as being malicious

const express = require('express');
const { addReport } = require('../../middlewares/database');
const router = express.Router();

router.post('/',  async (req, res) => {
    await addReport(res.locals.user, req.body);
    res.send({status: "Ok!"});
});

module.exports = router;