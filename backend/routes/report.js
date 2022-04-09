// Reports a page as being malicious

const express = require('express');
const router = express.Router();

router.post('/',  (req, res) => {
    console.log('req.body :>> ', req.body);
    console.log(req.body.url + " has been reported!");
    res.send({status: "Ok!"});
});

module.exports = router;