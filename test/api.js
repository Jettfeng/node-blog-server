const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('bbbbbbbbbbbbbbbbbbbbbbb')
    next()
})
router.get('/test', (req, res, next) => {
    res.json({
        test: 'xxxxxx'
    })
})

module.exports = router