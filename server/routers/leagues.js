const express = require('express')
const router = express.Router()
const auth = require('../authentication')
const League = require('../models/league')

// Enable authentication on all paths
router.use(auth.block)      // IF YOU ARE ADDING ANOTHER ROUTES FILE, YOU PROBABLY WANT THIS LINE!!!!!

// Special /me route returns information private to the user
router.get('/', async function (req, res) {
    const leagues = await League.find()
    res.json(leagues.map(l => l.toObject()))
})

router.post('/', async function (req, res) {
    const league = new League(req.body);
    try {
        await league.save()
        res.json(league)
    } catch(e) {
        res.statusCode = 400
        res.json({
            'error': 'validation',
            'message': e.message
        })
    }
})


module.exports = router
