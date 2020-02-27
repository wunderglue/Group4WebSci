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

// Test adding information to DB
router.post('/testDB', async (req, res) => {
    console.log("Connected testDB")
    // Student, league, practice_type, results: (exercise, repitition, weight)
    testPractice = {
        "student": "Jon",
        "league": "1",
        "practice_type": "Lift",
        "results": [{
            "exercise": "Bench",
            "repitions": "5",
            "weight": "135"
        }]
    }
    const prac = new Practice(testPractice)
    await prac.save()
    console.log("Saved")
    return res.json({
        username: "Returned"
    })
})

// I don't like this being a get request, but it has to because CAS standard and CORS
router.get('/me/logout', auth.logout)

module.exports = router
