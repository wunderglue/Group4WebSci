const mongoose = require('mongoose')

function atLeast1(val) {
    return val.length >= 1;
}

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    members: [String],
    coaches: {
        type: [String],
        validate: [atLeast1, '{PATH} must have at least on entry']
    },
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
        },
        description: {
            type: String,
            required: false
        }
    }]
})

const League = mongoose.model('League', leagueSchema)
module.exports = League
