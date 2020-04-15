const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
    name: String,
    members: [String],
    coaches: [String],
    questions: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        units: {
            type: String,
            required: false
        }
    }]
})

const League = mongoose.model('League', leagueSchema)
module.exports = League
