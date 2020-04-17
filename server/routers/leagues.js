const express = require('express')
const moongoose = require('mongoose')
const router = express.Router()
const auth = require('../authentication')
const League = require('../models/league')

// Enable authentication on all paths
router.use(auth.block)      // IF YOU ARE ADDING ANOTHER ROUTES FILE, YOU PROBABLY WANT THIS LINE!!!!!

async function getLeagueOr404(id, res) {
    try {
        id = moongoose.Types.ObjectId(id)
    } catch(e) {
        res.statusCode = 400
        res.json({
            'error':'validation',
            'message':`${id} is not a valid id`
        })
        throw e
    }

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

/**
 * Fetch a league
 */
router.get('/', async function (req, res) {
    const leagues = await League.find()
    res.json(leagues.map(l => l.toObject()))
})

/**
 * Create a league
 */
router.post('/', async function (req, res) {
    const league = new League(req.body)
    saveAndValidate(league, res)
})


/**
 * Get a single league by ID
 */
router.get('/:id', async function (req, res) {
    const league = await getLeagueOr404(req.params.id, res)
    res.json(league.toObject())
})

/**
 * Add a member to the league.
 */
router.put('/:id/members/:rcs_id', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.members.push(req.params.rcs_id)

    // Save the league and error if validation fails
    await saveAndValidate(league, res)
})

/**
 * Remove member from the league
 */
router.delete('/:id/members/:rcs_id', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.members = league.members.filter(m => m !== req.params.rcs_id)

    // Save the league and error if validation fails
    await saveAndValidate(league, res)
})

/**
 * Add a coach to the league.
 */
router.put('/:id/coaches/:rcs_id', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.coaches.push(req.params.rcs_id)

    // Save the league and error if validation fails
    await saveAndValidate(league, res)
})

/**
 * Remove member from the league
 */
router.delete('/:id/coaches/:rcs_id', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.coaches = league.coaches.filter(c => c !== req.params.rcs_id)

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

/**
 * Delete a question by id
 */

router.delete('/:league_id/questions/:question_id', async function (req, res) {
    const user = await auth.getUser(req)

    const league = await getLeagueOr404(req.params.league_id, res)
    ensureCoach(league, user, res)

    // Do the actual logic
    league.questions = league.questions.filter(q => q._id != req.params.question_id)

    // Save the league and error if validation fails
    await saveAndValidate(league, res)
})


module.exports = router
