const express = require('express')
const router = express.Router()
const auth = require('../authentication')

// Enable authentication on all paths
router.use(auth.block)

// Special /me route returns information private to the user
router.get('/me', function (req, res) {
    const session_name = auth.getUsername(req)
    res.json({
        username: session_name,
    })
})

module.exports = router
