var express = require('express');
var router = express.Router();

router.get('/list',(req,res) => {
    res.json({
        list: [1,2,3]
    })
})

module.exports = router