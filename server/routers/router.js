const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/api/hello', (req, res) => {
    res.json({'hello':'world'})
})

// Fall back to sending http site
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'))
})

module.exports = router