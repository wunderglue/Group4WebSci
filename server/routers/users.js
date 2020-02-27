const express = require('express')
const router = express.Router()
const auth = require('../authentication')

// Enable authentication on all paths
router.use(auth.block)      // IF YOU ARE ADDING ANOTHER ROUTES FILE, YOU PROBABLY WANT THIS LINE!!!!!

// Special /me route returns information private to the user
router.get('/me', function (req, res) {
    const username = auth.getUsername(req)
    res.json({
        username: username,
    })
})

// I don't like this being a get request, but it has to because CAS standard and CORS
router.get('/me/logout', auth.logout)

module.exports = router
