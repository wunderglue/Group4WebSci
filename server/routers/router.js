const express = require('express')
const router = express.Router()
const path = require('path')
const auth = require('../authentication')

// Fall back to sending client application
router.get('*', auth.bounce, (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/app.html'))
})

module.exports = router