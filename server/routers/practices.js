const express = require('express')
const router = express.Router()
const auth = require('../authentication')
const Practice = require('../models/practice')

// Enable authentication on all paths
router.use(auth.block)      // IF YOU ARE ADDING ANOTHER ROUTES FILE, YOU PROBABLY WANT THIS LINE!!!!!

router.post('/', async (req, res) => {
    const practice = new Practice(req.body)
    try {
        await practice.save()
        res.json(practice)
    } catch(e) {
        res.statusCode = 400
        res.json({
            'error': 'validation',
            'message': e.message
        })
    }
})

module.exports = router