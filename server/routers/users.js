const express = require('express')
const router = express.Router()
const auth = require('../authentication')
const Practice = require('../models/practice')

// Enable authentication on all paths
router.use(auth.block)      // IF YOU ARE ADDING ANOTHER ROUTES FILE, YOU PROBABLY WANT THIS LINE!!!!!

// Special /me route returns information private to the user
router.get('/me', function (req, res) {
    const username = auth.getUsername(req)
    res.json({
        username: username,
    })
})


router.get('/:id/statistics', async (req, res) => {
    const results = await Practice.aggregate([
        {$match: {student: req.params.id}},
        {$sort: {createdAt: -1}},
        {$unwind: "$results"},
        {
            $group: {
                _id: "$results.name",
                latest: {$first: "$results.value"},
                average: {$avg: "$results.value"},
                max: {$max: "$results.value"},
                min: {$min: "$results.value"},
            },
        },
    ])
    await res.json(results)
})

// I don't like this being a get request, but it has to because CAS standard and CORS
router.get('/me/logout', auth.logout)

module.exports = router
