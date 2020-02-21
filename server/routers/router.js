const express = require('express')
const router = express.Router()
const path = require('path')
const auth = require('../authentication')

router.get('/api/hello', auth.block, (req, res) => {
    res.json({'hello':'world'})
})

// Fall back to sending http site
router.get('*', auth.bounce, (req, res) => {
    console.log("foo");
    res.sendFile(path.join(__dirname, '../../client/app.html'))
})

module.exports = router