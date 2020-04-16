const express = require('express')
const router = express.Router()
const auth = require('../authentication')
const League = require('../models/league')

// Enable authentication on all paths
router.use(auth.block)      // IF YOU ARE ADDING ANOTHER ROUTES FILE, YOU PROBABLY WANT THIS LINE!!!!!

async function getLeagueOr404(id, res) {
    const league = await League.findOne({_id: id})

    // Error if the league you are trying to edit does not exist
    if (!league) {
        res.statusCode = 404
        res.json({
            'error': 'not found',
            'message': `could not find league with id "${id}"`
        })
    }
    return league;
}

function ensureCoach(league, user, res) {
    // Error if you do not have permission to add students
    if (!league.coaches.includes(user.rcs_id)) {
        res.statusCode = 403
        res.json({
            'error': 'forbidden',
            'message': 'you must be a coach'
        })
    }
}

async function saveAndValidate(league, res) {
    try {
        await league.save()
        res.json(league)
    } catch (e) {
        res.statusCode = 400
        res.json({
            'error': 'validation',
            'message': e.message
        })
    }
}

// Special /me route returns information private to the user
router.get('/', async function (req, res) {
    const leagues = await League.find()
    res.json(leagues.map(l => l.toObject()))
})

router.post('/', async function (req, res) {
    const league = new League(req.body)
    saveAndValidate(league, res)
})


/**
 * Add a member to the league.
 */
router.put('/:id/members/:member', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.members.push(req.params.member)

    // Save the league and error if validation fails
    await saveAndValidate(league, res)
})

/**
 * Remove member from the league
 */
router.delete('/:id/members/:member', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.members = league.members.filter(m => m !== req.params.member)

    // Save the league and error if validation fails
    await saveAndValidate(league, res)
})

/**
 * Add a question
 */
router.post('/:id/questions', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.questions.push(req.body)

    // Save the league and error if validation fails
    await saveAndValidate(league, res)
})

module.exports = router
