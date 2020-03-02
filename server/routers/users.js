const express = require('express')
const router = express.Router()
const auth = require('../authentication')
const Practice = require('../models/practice')

// Enable authentication on all paths
// router.use(auth.block)      // IF YOU ARE ADDING ANOTHER ROUTES FILE, YOU PROBABLY WANT THIS LINE!!!!!

// Special /me route returns information private to the user
router.get('/me', function (req, res) {
    const username = auth.getUsername(req)
    res.json({
        username: username,
    })
})

// Test adding information to DB
router.get('/testDB', async (req, res) => {
    console.log("Connected testDB")
    // test results
    testResults = {
        "exercise": "Squat",
        "repititions": "10",
        "weight": "185"
    }
    await Practice.findOneAndUpdate({rcsid: "testy1"}, testResults, (err, res) => {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    })

    // if user doesn't exist, create a new user.
    // Student, league, practice_type, results: (exercise, repitition, weight)
    testPractice = {
        "student": "test",
        "rcsid": "testy1",
        "league": "1",
        "practice_type": "Lift",
        "results": [{
            "exercise": "Bench",
            "repititions": "5",
            "weight": "155"
        }]
    }
    const prac = new Practice(testPractice)
    console.log(prac)
    prac.save(function(err, prac) {
        console.log("Saved")
        console.log(err, prac)
        return res.json({
            username: "Returned"
        })
    })
})

router.get('/aggregateStats', async (req, res) => {
    console.log("Aggregate")
    const user = await Practice.find({rcsid: "testy1"})
    if(!user){
        return res.json({
            username: "No user"
        })
    }

    // console.log(user)
    weights = 0
    counter = 0
    console.log(user[0].results)
    for(i = 0; i < user.length; i++){
        for(x = 0; x < user[i].results.length; x++){
            weights += user[i].results[x].weight
            counter++;
        }
    }

    avgWeight = weights / counter
    console.log(avgWeight)
    return res.json({
        username: avgWeight
    })
})

// I don't like this being a get request, but it has to because CAS standard and CORS
router.get('/me/logout', auth.logout)

module.exports = router